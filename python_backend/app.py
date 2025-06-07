from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config

from remotion_agent_python import RemotionAgent, DEFAULT_PYTHON_CONFIG

load_dotenv()

app = Flask(__name__)

# Initialize agent (can be done once or per request depending on needs)
# For simplicity here, we create it per request, but consider lifespan
# agent_instance = None

# def get_agent():
#     global agent_instance
#     if agent_instance is None:
#         agent_config = {
#             **DEFAULT_PYTHON_CONFIG, # Spreading the dict
#             "openaiApiKey": os.getenv("OPENAI_API_KEY", "")
#         }
#         agent_instance = RemotionAgent(agent_config)
#         # asyncio.run(agent_instance.initialize_rag()) # If RAG needs async init
#     return agent_instance


@app.route('/api/generate', methods=['POST'])
async def generate_video_code():
    data = request.get_json()
    prompt = data.get('prompt')
    llm_provider_from_request = data.get('llm_provider', 'openai')
    llm_model_from_request = data.get('llm_model')

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    openai_api_key = os.getenv("OPENAI_API_KEY")
    google_api_key = os.getenv("GOOGLE_API_KEY")

    if llm_provider_from_request == "openai" and not openai_api_key:
        return jsonify({"error": "OPENAI_API_KEY environment variable is not set for OpenAI provider."}), 500
    if llm_provider_from_request == "google" and not google_api_key:
        return jsonify({"error": "GOOGLE_API_KEY environment variable is not set for Google provider."}), 500
    
    if llm_provider_from_request not in ["openai", "google"]:
        return jsonify({"error": "Invalid llm_provider. Must be 'openai' or 'google'."}), 400

    try:
        user_agent_config_overrides = {
            "openaiApiKey": openai_api_key,
            "googleApiKey": google_api_key,
            "llm": {
                "provider": llm_provider_from_request,
            }
        }
        if llm_model_from_request:
            user_agent_config_overrides["llm"]["modelName"] = llm_model_from_request
        
        # Create a full config by deeply merging DEFAULT_PYTHON_CONFIG with overrides
        current_config = {k: dict(v) if isinstance(v, dict) else v for k, v in DEFAULT_PYTHON_CONFIG.items()}

        # Apply overrides
        current_config["openaiApiKey"] = user_agent_config_overrides["openaiApiKey"]
        current_config["googleApiKey"] = user_agent_config_overrides["googleApiKey"]
        
        if "llm" in user_agent_config_overrides:
            current_config["llm"] = {**current_config.get("llm", {}), **user_agent_config_overrides["llm"]}

        agent = RemotionAgent(current_config)

        result = await agent.generate_remotion_code(prompt)

        if result.get("success") and result.get("finalCode"):
            anim_config = result.get("animationConfig", {})
            metadata = {
                "compositionId": anim_config.get("compositionId", "MainComposition"),
                "width": anim_config.get("width", 1920),
                "height": anim_config.get("height", 1080),
                "fps": anim_config.get("fps", 30),
                "duration_in_frames": anim_config.get("durationInFrames", 150),
            }
            return jsonify({
                "tsx": result["finalCode"],
                "metadata": metadata,
                "enhancedPrompt": result.get("enhancedPrompt")
            })
        else:
            return jsonify({
                "error": "Failed to generate Remotion code.",
                "details": result.get("errors", ["Unknown error."]),
                "enhancedPrompt": result.get("enhancedPrompt"),
                "totalAttempts": result.get("totalAttempts")
            }), 500

    except Exception as e:
        app.logger.error(f"Error during code generation: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    config = Config() 
    config.bind = ["localhost:5000"]
    config.use_reloader = True  # Enable auto-reload
    config.watch_files = ["*.py", "*.tsx", "*.ts"]  # Watch Python and TypeScript files
    asyncio.run(serve(app, config))