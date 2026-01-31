## Inspiration

Students and early-career professionals often feel underprepared for interviews—not due to lack of ability, but because practicing can be intimidating. Professional career coaching can be expensive, mock interviews can feel awkward, and many candidates fear being judged. **Interview Pal** provides a safe, realistic, and on-demand environment for interview practice anytime, anywhere.

---

## What It Does

* Users select a **role** and **company**, which the backend matches to a stored job description.
* Users upload their **resume**, which is parsed for key skills, experiences, and projects.
* The AI generates **context-aware, role-specific interview questions**.
* Users conduct **real-time voice interviews** with the AI agent.
* After the session, users receive a **detailed evaluation** and feedback on performance.

---

## How We Built It (Technical Overview)

* **Frontend**
  Built with **React + Redux**, providing a responsive, real-time user interface with seamless voice integration.

* **Backend**
  Built with **FastAPI**, serving as the API layer for agents, resume parsing, and database operations.

* **Resume Analysis Agent**
  Extracts structured information from resumes using NLP techniques: skills, experience, projects, and achievements.

* **Question Preparation Agent**
  Generates interview questions tailored to the user’s profile and the selected job description using context-aware LLM prompts.

* **Interview Agent**
  Conducts live, real-time voice interviews leveraging the **OpenAI Realtime SDK**. Maintains persistent session context for coherent, natural dialogue. Handles interruptions and background noise gracefully.

* **Model**: gpt-3.5 turbo

* **Other Tools & Framework**
  * **LangChain** for orchestrating multi-agent workflows
  * **Supabase** for user data storage and authentication
  * NLP for context-aware 

---

## Accomplishments

* Built a fully **real-time, voice-driven interview experience**
* Developed **resume-aware AI question generation**
* Completed the project **within 24 hours** during an in-person hackathon

---

## Next Steps

* Implement **AI-driven interview evaluation** with actionable feedback
* Track **user progress** across multiple sessions
* Expand **multilingual support and accessibility**

---

## Video Demo
We are currently in the midst of beta development, and have not deployed this thing due to API credit contraints.
But, here is a video demo!
https://youtu.be/NL71paK-edo
