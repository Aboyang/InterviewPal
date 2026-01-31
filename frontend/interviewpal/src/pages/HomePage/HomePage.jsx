import { useNavigate } from 'react-router-dom'
import '../../index.css'
import './HomePage.css'
import { useEffect, useState } from 'react'

function HomePage() {
    const navigate = useNavigate()

    const [caretShow, setCaretShow] = useState(true)
    
    useEffect(() => {
        const intervalID = setInterval(() => {setCaretShow(prev => !prev)}, 500)

        return () => {clearInterval(intervalID)}
    }, [])

    return (
        <div className='centerer-flex flex-col'>
            <h1 className='title'>InterviewPal{caretShow ? "_" : ""}</h1>
            <div className='flex-col'>
                <button className="btn-primary btn-large width-full" onClick={() => navigate("/onboarding")}>Get Started</button>
                <button className="btn-large width-full" onClick={() => navigate("/onboarding")}>Sign In</button>
            </div>
        </div>
    )
}

export default HomePage