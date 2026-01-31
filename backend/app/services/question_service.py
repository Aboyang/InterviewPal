from app.agents.question.question_agent import question_agent

def prepare_questions(role, company, resume_context):
    content = f'''
    Resume Context:
    {resume_context}

    Job Description:
    Fetch for {role} at {company} using the tool.

    Then, using job description and resume context, prepare questions to ask during the interview."
    '''

    result = question_agent.invoke(
        {"messages": [{"role": "user", "content": content}]}
    )

    return result["messages"][-1].content
