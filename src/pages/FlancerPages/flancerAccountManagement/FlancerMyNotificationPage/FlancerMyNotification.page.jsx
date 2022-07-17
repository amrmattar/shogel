import React from 'react'
import FlancerNotificationComponent from '../../../../components/FreeLancer/fLancerProfile/FlancerNotification/FlancerNotification.component'

const FlancerMyNotificationPage = () => {
    return (
        <div>
            {Array(4).fill().map((el, ix) => {
                return <div className="mt-5" key={ix}>
                    <FlancerNotificationComponent />
                </div>
            })}
        </div>
    )
}

export default FlancerMyNotificationPage
