from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import question, resume
from app.api.v1.routes import interview

app = FastAPI()

app.include_router(question.router)
app.include_router(resume.router)
app.include_router(interview.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
