from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any
from app.services.question_service import prepare_questions

router = APIRouter(
    prefix="/question",
    tags=["question"]
)

class QuestionRequest(BaseModel):
    role: str
    company: str
    resume_context: Any

@router.post("/")
async def get_questions(req: QuestionRequest):
    questions = prepare_questions(req.role, req.company, req.resume_context)
    return {"questions": questions}
