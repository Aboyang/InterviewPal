import ConvoAI from "../../../components/ConvoAI/ConvoAI"
import "./InterviewPage.css"
import "../../index.css"

function InterviewPage() {
    return (
        <div className="centerer-flex flex-col">
            <h3 className="interview-title">Interview Pal</h3>
            <ConvoAI />
        </div>
    )
}

export default InterviewPage