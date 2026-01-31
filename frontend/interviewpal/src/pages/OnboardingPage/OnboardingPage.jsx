import { useEffect, useState } from "react"
import FileUpload from "../../../components/FileUpload/FileUpload"
import "../../index.css"
import "./OnboardingPage.css"
import { useNavigate } from "react-router-dom"
import RoleSelect from "../../../components/RoleSelect/RoleSelect"
import JobDescription from "../../../components/JobDescription/JobDescription"
import ResumeReview from "../../../components/ResumeReview/ResumeReview"
import Question from "../../../components/Question/Question"

function OnboardingPage() {

    const [questionIndex, setQuestionIndex] = useState(0)

    const questionHeaders = [
        "Upload your resume",
        "Review your resume details:",
        "What role would you like?",
        "Review your job description",
        "View your interview questions"
    ]
    const questionComponents = [
        <FileUpload />,
        <ResumeReview />,
        <RoleSelect />,
        <JobDescription />,
        <Question />
    ]

    const navigate = useNavigate()

    const handleBackClick = () => {
        if (questionIndex <= 0) {
            navigate(-1) // back to prev page
            return
        }

        setQuestionIndex(questionIndex - 1)
    }

    const handleNextClick = () => {
        if (questionIndex >= questionComponents.length - 1) { 
            navigate("/interview")
            return
        }
        
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <>
            <div className="centerer-flex">
                <div className="onboarding-container flex-col">
                    <h3 className="reduce-margin-top">{questionHeaders[questionIndex]}</h3>
                    {questionComponents[questionIndex]}
                </div>
            </div>
            <div className="centerer-flex flex-row arrows-container-container">
                <div className="arrows-container flex-row width-full">
                    <button className="btn-large btn-icon btn-primary btn-back" onClick={handleBackClick}><span className="material-symbols-rounded">chevron_backward</span></button>
                    <button className="btn-large btn-icon btn-primary btn-next" onClick={handleNextClick}><span className="material-symbols-rounded">chevron_forward</span></button>
                </div>
            </div>
        </>
    )
}

export default OnboardingPage