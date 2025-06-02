// src/tools/ragSetup.ts
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { RemotionAgentConfig } from "../types";

export interface RagUtil {
  vectorStore: MemoryVectorStore | null;
  isInitialized: boolean;
  initialize: (config: Required<RemotionAgentConfig>['rag'], embeddingsApiKey: string) => Promise<void>;
  retrieveContext: (query: string, config: Required<RemotionAgentConfig>['rag']) => Promise<string>;
}

export const ragUtil: RagUtil = {
  vectorStore: null,
  isInitialized: false,

  async initialize(config, embeddingsApiKey) {
    if (!config.enabled || this.isInitialized) {
      if(!config.enabled) console.log("RAG is disabled in config.");
      return;
    }
    console.log("Initializing RAG with Remotion documentation...");
    try {
      const embeddings = new OpenAIEmbeddings({ openAIApiKey: embeddingsApiKey });
      const allDocs: Document[] = [];

      for (const url of config?.documentUrls ?? []) {
        try {
          console.log(`Loading RAG docs from: ${url}`);
          const loader = new CheerioWebBaseLoader(url);
          const loadedDocs = await loader.load();
          // Add source metadata
          loadedDocs.forEach(doc => doc.metadata = { ...doc.metadata, source: url });
          allDocs.push(...loadedDocs);
        } catch (error: any) {
          console.warn(`Failed to load documentation from ${url}: ${error.message}`);
        }
      }

      if (allDocs.length === 0) {
        console.warn("No documentation loaded for RAG. RAG will be ineffective.");
        this.isInitialized = true; // Mark as initialized to prevent re-attempts
        return;
      }

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: config.chunkSize,
        chunkOverlap: config.chunkOverlap,
      });
      const splitDocs = await textSplitter.splitDocuments(allDocs);

      this.vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
      this.isInitialized = true;
      console.log(`RAG initialized with ${splitDocs.length} document chunks from ${config?.documentUrls?.length ?? 0} sources.`);
    } catch (error: any) {
      console.error(`Error setting up RAG: ${error.message}`);
      this.vectorStore = null; // Ensure it's null on failure
      this.isInitialized = false; // Allow re-initialization attempt if desired
    }
  },

  async retrieveContext(query, config) {
    if (!this.isInitialized || !this.vectorStore || !config.enabled) {
      console.log("RAG not available or disabled, skipping context retrieval.");
      return "";
    }
    try {
      console.log("Retrieving relevant documentation for query...");
      const retriever = this.vectorStore.asRetriever({ k: config.maxRetrievedDocs });
      const relevantDocs = await retriever.getRelevantDocuments(query);
      
      if(relevantDocs.length === 0) {
        console.log("No relevant documents found by RAG.");
        return "";
      }
      
      const context = relevantDocs
        .map(doc => `Source: ${doc.metadata.source}\nContent:\n${doc.pageContent}`)
        .join("\n\n---\n\n");
      console.log(`Retrieved ${relevantDocs.length} relevant documentation chunks for RAG.`);
      return context;
    } catch (error: any) {
      console.error(`Error retrieving context with RAG: ${error.message}`);
      return "";
    }
  },
};