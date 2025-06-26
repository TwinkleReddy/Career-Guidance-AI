import { getUserOnBoardingStatus } from '@/actions/user'
import { industries } from '@/data/industries'
import { redirect } from 'next/navigation'
import OnBoardingForm from './_components/onboarding-form'
import React from 'react'

const OnboardingPage = async () => {

  const {isOnboarded} = await getUserOnBoardingStatus() 

  if(isOnboarded){
    redirect('/onboarding');
  }

  return (
    <main>
      <OnBoardingForm industries = {industries}/>
    </main>
  )
}

export default OnboardingPage
