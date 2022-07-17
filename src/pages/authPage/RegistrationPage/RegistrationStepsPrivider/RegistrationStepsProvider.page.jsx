import React from 'react'
import { StepsProvider } from 'react-step-builder'
import { LabelProvider } from '../../../../Dash/FormStep/LabelDataContext/labelDataContext'
import MasterRegistrationComponent from '../../../../Dash/FormStep/MasterRegistrationComponent'

const RegistrationStepsProviderPage = () => {
    return (
        <>
            <LabelProvider>
                    <MasterRegistrationComponent />
            </LabelProvider>
        </>
    )
}

export default RegistrationStepsProviderPage