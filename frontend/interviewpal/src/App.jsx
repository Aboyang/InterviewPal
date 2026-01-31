import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage'
import InterviewPage from './pages/InterviewPage/InterviewPage'
import store from '../redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store} >
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/onboarding' element={<OnboardingPage />} />
      <Route path='/interview' element={<InterviewPage />} />

      {/* fallback */}
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
    </Provider>
  )
}

export default App
