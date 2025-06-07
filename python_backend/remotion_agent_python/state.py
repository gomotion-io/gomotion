from typing import List, Optional, TypedDict, Literal
from langchain_core.messages import BaseMessage
import uuid

class AnimationParameters(TypedDict, total=False):
    compositionId: Optional[str]
    durationInFrames: Optional[int]
    fps: Optional[int]
    width: Optional[int]
    height: Optional[int]

class RemotionAgentState(TypedDict):
    sessionId: str
    originalPrompt: str
    enhancedPrompt: Optional[str]
    
    ragContext: Optional[str] # For RAG results
    
    generatedCode: Optional[str]
    validationLog: List[str]
    validationStatus: Literal['pending', 'success', 'failure']
    
    currentErrors: List[str]
    totalAttempts: int
    
    finalCode: Optional[str]
    finalUserMessage: Optional[str]
    
    messages: List[BaseMessage]
    animationConfig: Optional[AnimationParameters]


def get_initial_state() -> dict: # Omit<RemotionAgentState, 'originalPrompt' | 'sessionId'>
    return {
        "enhancedPrompt": None,
        "ragContext": None,
        "generatedCode": None,
        "validationLog": [],
        "validationStatus": 'pending',
        "currentErrors": [],
        "totalAttempts": 0,
        "finalCode": None,
        "finalUserMessage": None,
        "messages": [],
        "animationConfig": None,
    } 