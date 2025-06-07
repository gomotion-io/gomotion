# Python Remotion Agent Backend

This is a Python Flask backend that replicates the core functionality of the TypeScript RemotionAgent for generating Remotion TSX code. It uses Langchain and LangGraph for the AI workflow, and includes stubs for future integration with ElevenLabs and Pexels APIs.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the `python_backend` directory with:
```
OPENAI_API_KEY="your_openai_api_key_here"
# ELEVENLABS_API_KEY="your_elevenlabs_api_key_here" # Add when ready
# PEXELS_API_KEY="your_pexels_api_key_here"       # Add when ready
```

## Running the Server

Run the Flask application with Hypercorn (for async support):
```bash
python app.py
```

The server will start on http://localhost:5000.

## API Usage

Send a POST request to `/api/generate` with a JSON body:
```json
{
    "prompt": "A spinning square with text 'Hello Gemini'.",
    "llm_provider": "google",
    "llm_model": "gemini-2.5-pro-preview-05-06"
}
```

The response will include:
- `tsx`: The generated Remotion TSX code
- `metadata`: Animation configuration (composition ID, dimensions, FPS, duration)
- `enhancedPrompt`: The enhanced version of your prompt

## Project Structure

```
python_backend/
├── app.py                     # Flask application
├── remotion_agent_python/
│   ├── __init__.py
│   ├── agent.py               # Main RemotionAgent class
│   ├── config.py              # Configuration classes and defaults
│   ├── state.py               # State management
│   ├── prompts.py             # Prompt templates
│   ├── nodes.py               # LangGraph node functions
│   └── mcp_tools.py           # Stubs for ElevenLabs, Pexels (MCP)
├── requirements.txt
└── .env                       # For API keys
```

## Future Enhancements

1. RAG (Retrieval-Augmented Generation) implementation
2. Code validation and testing
3. Integration with ElevenLabs for audio generation
4. Integration with Pexels for stock video
5. Error handling and retry mechanisms
6. Caching and performance optimizations

## Notes

- The current implementation uses a simplified workflow (enhance prompt -> generate code)
- RAG, validation, and error handling are currently placeholders
- MCP tools (ElevenLabs, Pexels) are stubs and need to be implemented
- The server uses Hypercorn for async support 