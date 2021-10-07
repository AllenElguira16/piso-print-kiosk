import type { NextPage } from 'next'
import { useState } from 'react'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import Step4 from '../components/Step4'

const Home: NextPage = () => {
  const [currentStep, setStep] = useState(1);

  return (
    <>
      {currentStep === 1 && <Step1 nextStep={() => setStep(currentStep + 1)}/>}
      {currentStep === 2 && <Step2 nextStep={() => setStep(currentStep + 1)}/>}
      {currentStep === 3 && <Step3 nextStep={() => setStep(currentStep + 1)}/>}
      {currentStep === 4 && <Step4 nextStep={() => setStep(currentStep + 1)}/>}
    </>
  )
}

export default Home
