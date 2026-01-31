from langchain.tools import tool
from app.agents.model import model
from supabase import create_client, Client
import os
from dotenv import load_dotenv
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

@tool("fetch_job_desc", description="To fetch job description for the role from the database.", return_direct=False)
def fetch_job_desc(role, company):
    '''
    Take `role` as arg, and query the database for the corresponding job description.
    '''

    print(f">>> Fetching job description for {role} at {company}...")

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    response = (
        supabase
        .table("roles")
        .select("*")
        .eq("role_name", role)
        .eq("company", company)
        .execute()
    )

    return response.data

@tool("prepare_questions", description="To prepare questions for the interview.", return_direct=True)
def prepare_questions(job_desc, resume_context):
    '''
    Prepare questions for the interview using job description and resume context.
    '''

    print(">>> Preparing questions for the interview...")
    prompt = f"""
You are an expert technical interviewer.

You are given:
1. A JOB DESCRIPTION
2. A RESUME CONTEXT extracted from the candidate's resume

Your task is to prepare EXACTLY ONE high-quality interview question for EACH category below.

----------------------------------
JOB DESCRIPTION:
{job_desc}

----------------------------------
RESUME CONTEXT:
{resume_context}

----------------------------------

### QUESTION GUIDELINES

1. Resume-related Question:
- Focus on the candidate’s MOST relevant work experience or project
- Ask about decisions made, challenges faced, or impact achieved

2. Technical Question:
- Must relate to the role requirements
- Must reference technical skills or concepts listed in the resume
- Test understanding, not trivia

3. Behavioural Question:
- Focus on attitude, leadership, teamwork, work ethic, adaptability, or growth mindset
- Use real-world scenarios

4. Company Question:
- Evaluate how well the candidate has prepared
- Focus on company knowledge, motivation, or alignment with the role

----------------------------------

### OUTPUT FORMAT (JSON ONLY, NO EXTRA TEXT)

Return your answer in EXACTLY the following JSON structure:

{{
  "question_resume": ["<one resume-related question>"],
  "question_technical": ["<one technical question>"],
  "question_behavioural": ["<one behavioural question>"],
  "question_company": ["<one company-related question>"]
}}

- Each list MUST contain EXACTLY ONE question
- Do NOT include explanations or commentary
- Do NOT include markdown or formatting
"""
    
    response = model.invoke(prompt)
    return response.content
