import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedRole: "",
    selectedCompany: "",
    selectedDescription: "",
    resumeContext: null,
    questions: null
}

const onBoardingSlice = createSlice({
    name: "onboarding", 
    initialState,
    reducers: {
        setRoleAndCompany: (state, action) => {
            state.selectedRole = action.payload.role_name
            state.selectedCompany = action.payload.company
            state.selectedDescription = action.payload.job_description
        },
        setResumeContext: (state, action) => {
            state.resumeContext = action.payload
        },
        setQuestions: (state, action) => {
            state.questions = action.payload
        }
    }
})

export default onBoardingSlice.reducer // reducer
export const { setRoleAndCompany, setResumeContext, setQuestions } = onBoardingSlice.actions // actions