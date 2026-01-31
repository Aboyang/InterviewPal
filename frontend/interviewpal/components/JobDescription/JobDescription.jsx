import { useSelector } from "react-redux"
import "./JobDescription.css"

function JobDescription() {

    const { selectedDescription } = useSelector((state) => state.onboarding)
    return (
        <div className="text">{selectedDescription}</div>
    )
}

export default JobDescription