import { useState } from "react";
import "./Question.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setQuestions } from "../../redux/onboardingSlice";

function Question() {
  const { selectedRole, selectedCompany, resumeContext, questions } = useSelector((state) => state.onboarding)
  const dispatch = useDispatch()


  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false); 

    const toggleExpand = async () => {
    // if questions already loaded
    if (questions) {
        setIsExpanded(!isExpanded);
        return;
    }

    if (!isExpanded) {
        setLoading(true);
        try {
        const body = {
            role: selectedRole,
            company: selectedCompany,
            resume_context: resumeContext,
        };

        const response = await axios.post(
            "http://localhost:8000/question/",
            body,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Questions: ", response.data.questions);

        dispatch(setQuestions(JSON.parse(response.data.questions) || {}))
        setIsExpanded(true);
        } catch (error) {
        console.error(
            "Error fetching questions:",
            error.response?.data || error
        );
        } finally {
        setLoading(false);
        }
    } else {
        // Shrink back
        setIsExpanded(false);
    }
    };


  return (
    <div className="question-box">
      <div
        className={`box ${isExpanded ? "expanded" : ""}`}
        onClick={toggleExpand}
      >
        {!isExpanded ? (
          <span className="button-text">
            {loading ? "Loading..." : "Show Questions"}
          </span>
        ) : (
          <div className="content">
            <div className="questions">
              {questions.question_resume &&
                questions.question_resume.map((q, idx) => (
                  <p key={`resume-${idx}`}>- {q}</p>
                ))}

              {questions.question_technical &&
                questions.question_technical.map((q, idx) => (
                  <p key={`technical-${idx}`}>- {q}</p>
                ))}

              {questions.question_behavioural &&
                questions.question_behavioural.map((q, idx) => (
                  <p key={`behavioural-${idx}`}>- {q}</p>
                ))}

              {questions.question_company &&
                questions.question_company.map((q, idx) => (
                  <p key={`company-${idx}`}>- {q}</p>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
