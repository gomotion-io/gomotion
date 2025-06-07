from typing import TypedDict, Optional, List, Literal

class LLMConfig(TypedDict, total=False):
    provider: Optional[Literal["openai", "google"]]
    modelName: Optional[str]
    temperature: Optional[float]
    maxTokens: Optional[int]

class RAGConfig(TypedDict, total=False):
    enabled: Optional[bool]
    chunkSize: Optional[int]
    chunkOverlap: Optional[int]
    maxRetrievedDocs: Optional[int]
    documentUrls: Optional[List[str]]

class ErrorHandlingConfig(TypedDict, total=False):
    maxRetries: Optional[int]

class CodeValidationConfig(TypedDict, total=False):
    tempDir: Optional[str]
    cleanupAfterTest: Optional[bool]
    remotionLogLevel: Optional[Literal['quiet', 'info', 'verbose']]
    defaultCompositionId: Optional[str]
    videoFileName: Optional[str]
    npmInstallTimeout: Optional[int]
    remotionRenderTimeout: Optional[int]

class RemotionAgentConfig(TypedDict):
    openaiApiKey: Optional[str]
    googleApiKey: Optional[str]
    llm: Optional[LLMConfig]
    rag: Optional[RAGConfig]
    errorHandling: Optional[ErrorHandlingConfig]
    codeValidation: Optional[CodeValidationConfig]

# Default values, similar to your TypeScript version
DEFAULT_CONFIG_BASE: dict = {
    "llm": {
        "provider": "openai",
        "modelName": "gpt-4-turbo-preview",
        "temperature": 0.1,
        "maxTokens": 4000,
    },
    "rag": {
        "enabled": True,
        "chunkSize": 1500,
        "chunkOverlap": 200,
        "maxRetrievedDocs": 5,
        "documentUrls": [
            "https://www.remotion.dev/docs",
            "https://www.remotion.dev/docs/api",
        ],
    },
    "errorHandling": {
        "maxRetries": 2,
    },
    "codeValidation": {
        "tempDir": './remotion_agent_temp_py',
        "cleanupAfterTest": True,
        "remotionLogLevel": 'verbose',
        "defaultCompositionId": 'MainComposition',
        "videoFileName": 'MyVideo.tsx',
        "npmInstallTimeout": 180000,
        "remotionRenderTimeout": 120000,
    },
}

def get_config(user_config: dict) -> RemotionAgentConfig:
    config = {**DEFAULT_CONFIG_BASE}

    config["openaiApiKey"] = user_config.get("openaiApiKey")
    config["googleApiKey"] = user_config.get("googleApiKey")

    for key in ["llm", "rag", "errorHandling", "codeValidation"]:
        if key in user_config and user_config[key] is not None:
            config[key] = {**DEFAULT_CONFIG_BASE.get(key, {}), **user_config[key]}
        elif key not in config:
             config[key] = DEFAULT_CONFIG_BASE.get(key, {})

    if "llm" not in config or config.get("llm", {}).get("provider") is None:
        config["llm"] = {**DEFAULT_CONFIG_BASE.get("llm",{}), **config.get("llm",{})}
        if config.get("llm",{}).get("provider") is None:
             config["llm"]["provider"] = DEFAULT_CONFIG_BASE.get("llm",{}).get("provider", "openai")

    llm_provider = config.get("llm", {}).get("provider")
    if llm_provider == "openai" and not config["openaiApiKey"]:
        raise ValueError("OpenAI API key is required when LLM provider is OpenAI.")
    if llm_provider == "google" and not config["googleApiKey"]:
        raise ValueError("Google API key is required when LLM provider is Google.")

    return config 