import React from 'react'
import { StepsProvider } from 'react-step-builder'
import ForgetStepsHolder from '../ForgetStepsHolder/ForgetStepsHolder.component'

const AuthForgetPassword = () => {
    return (
        <>
            <div className='' >
                <StepsProvider>
                    <ForgetStepsHolder />
                </StepsProvider>
            </div>
        </>
    )
}

export default AuthForgetPassword