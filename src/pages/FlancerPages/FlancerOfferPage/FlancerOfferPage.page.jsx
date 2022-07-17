import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FlancerOfferPriceForm from '../../../components/FreeLancer/FlancerOfferPriceForm/FlancerOfferPriceForm.component'
import OfferPriceTitle from '../../../components/requestAQuote/OfferPriceDetails/OfferPriceTitle/OfferPriceTitle.component'
import { userProfile } from '../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core'

const FlancerOfferPage = () => {
    const [flancersData, setFlancersData] = useState()
    const param = useParams()
    useEffect(() => {
        if (!flancersData) {
            userProfile._GET_ProfileData(param?.id).then(res => setFlancersData(res.data.data)).catch(err => err.response)
        }
    }, [param?.id, flancersData])
    const myPersonData = {
        id: flancersData?.id,
        category: flancersData?.category,
        avatar: flancersData?.avatar,
        name: flancersData?.fullname,
        jobName: flancersData?.job_name_id?.name,
        myFlag: flancersData?.nationality?.logo,
        status: flancersData?.available,
        rate: flancersData?.rate,
        performance: flancersData?.complete_profile
    }
    return (
        <div className="h-100 position-relative">
            <div className="container-fluid py-5 px-4 cLT-main-bg">
                <OfferPriceTitle />
            </div>
            <div className="container px-0 position-relative" style={{ top: '-75px', left: '0px' }} >
                <FlancerOfferPriceForm data={myPersonData} />
            </div>
        </div>
    )
}
export default FlancerOfferPage
