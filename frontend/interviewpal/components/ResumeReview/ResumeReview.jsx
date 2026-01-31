import { useSelector } from "react-redux"
import "../../src/index.css"
import "./ResumeReview.css"
import "axios"

function ResumeReview() {

    const { resumeContext } = useSelector((state) => state.onboarding)

    return (
        <div className="flex-col container">
            <strong className="section">{"University: " + resumeContext.University}</strong>
            <strong className="section">{resumeContext.Grade}</strong>
            <details className="section collapsible">
                <summary>Career Experience</summary>
                <hr className="separator" />
                {resumeContext["Career Experience"].map((career, index) => {
                    return (
                        <>
                            <div key={index.toString()} className="collapsible-detail">
                                <span><strong>{career.role}</strong> | {career.date}</span>
                                <p>{career.description}</p>
                            </div>
                            <hr key={index.toString() + "separator"} className="separator" />
                        </>
                    )
                })}
            </details>
            <details className="section collapsible">
                <summary>Project Experience</summary>
                <hr className="separator" />
                {resumeContext["Project Experience"].map((project, index) => {
                    return (
                        <>
                            <div className="collapsible-detail">
                                <span><strong>{project.role}</strong> | {project.date}</span>
                                <p>{project.description}</p>
                            </div>
                            <hr key={index.toString() + "separator"} className="separator" />
                        </>
                    )
                })}
            </details>
            <details className="section collapsible">
                <summary>Technical Skillset</summary>
                <hr className="separator" />
                <div className="flex-wrap">
                    {resumeContext["Technical Skillset"].map((skill, index) => <p key={index} className="block">{skill}</p>)}
                </div>
            </details>
            <details className="section collapsible">
                <summary>Softskills Displayed</summary>
                <hr className="separator" />
                <div className="flex-wrap">
                    {resumeContext["Softskill Displayed"].map((skill, index) => <p key={index} className="block">{skill}</p>)}
                </div>
            </details>
        </div>
    )
}

export default ResumeReview