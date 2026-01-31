from app.utils.pdf_to_text import pdf_to_text
from app.agents.resume.resume_agent import parsed_resume
from app.agents.question.question_agent import question_agent

def extract_resume_context(pdf_bytes):
    resume_string = pdf_to_text(pdf_bytes)
    return parsed_resume(resume_string)



