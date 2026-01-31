from app.agents.model import model
from app.agents.question.system_prompt import SYSTEM_PROMPT
from app.agents.question.tools import fetch_job_desc, prepare_questions
from langchain.agents import create_agent

question_agent = create_agent(
    model=model,
    system_prompt=SYSTEM_PROMPT,
    tools=[fetch_job_desc, prepare_questions]
)
