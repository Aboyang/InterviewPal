import { useEffect, useState } from "react"
import "./FileUpload.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setResumeContext } from "../../redux/onboardingSlice"

function FileUpload({ setUserResponse, userResponse }) {
    const fileTypesAccepted = ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(false)
    const [parsed, setParsed] = useState(false)
    const dispatch = useDispatch()

    const preventFileDefault = (e) => {
        if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
            e.preventDefault();
        }
    }

    const dropHandler = (e) => {
        preventFileDefault(e)
        const file = e.dataTransfer.items[0].getAsFile()
        setResume(file)
    }

    const fileInputChangeHandler = (e) => {
        const file = e.target.files[0]
        setResume(file)
    }

    const clearFileUpload = () => {
        setResume(null)
    }

    const handleSubmitResume = async () => {
        if (!resume) return;
        setLoading(true)
        const formData = new FormData();
        formData.append("file", resume);

        try {
            const res = await axios.post(
            "http://localhost:8000/resume/context",
            formData,
            {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            }
            );

            console.log("Resume context:", res.data.resume_context);
            const parsedData = JSON.parse(res.data.resume_context)
            dispatch(setResumeContext(parsedData))
        } catch (err) {
            console.error("Resume upload failed:", err);
        }
        setLoading(false)
        setParsed(true)
    };

    useEffect(() => {
        window.addEventListener("dragover", preventFileDefault)
        window.addEventListener("drop", preventFileDefault)

        return () => {
            window.removeEventListener("dragover", preventFileDefault)
            window.removeEventListener("drop", preventFileDefault)
        };
    }, [])

    return (
        <div>
        <label className="drop-zone" onDrop={dropHandler}>
            {parsed
            ? "Resume parsed"
            : (loading
                ? "Parsing resume..."
                : (resume ? resume.name : "Drop your resume here, or click to upload."))
            }

            <input
            type="file"
            className="file-input"
            multiple={false}
            accept={fileTypesAccepted}
            onChange={fileInputChangeHandler}
            />

            <div className="btn-container flex-row">
                <button
                type="button"
                className="btn-icon"
                onClick={handleSubmitResume}
                disabled={!resume}
                >
                <span className="material-symbols-rounded">send</span>
                </button>

                <button
                type="button"
                className="clear-btn btn-icon"
                onClick={clearFileUpload}
                >
                <span className="material-symbols-rounded">close</span>
                </button>
            </div>
        </label>
        </div>

    )
}

export default FileUpload