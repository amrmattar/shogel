import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core'
import { updateProfile } from '../../../../core/services/userProfile/UpdateProfile/UpdateProfile.core'
import UserFeedBackShared from '../../../../shared/UserFeedBack/UserFeedBack.shared'
import { Col, Form, Row } from 'react-bootstrap'
import './FlancerOtherJobSites.component.scss'
import {getSocialMedia} from '../../../../core/redux/reducers/SocialMediaReducer.core'
const FlancerOtherJobSitesComponent = ({ socialSite,data ,checkupdate}) => {
    const dispatch = useDispatch()
    const [userID, messages] = useSelector((state) =>  [state.userData.id, state.messages])
    const [socialLoading, setSocialLoading] = useState('')
    const [socialData, setSocialData] = useState({value:"", social_id:""})
    const handleChange = (e,id) => {
        const {name,value} = e.target
        setSocialData(socialData => ({...socialData, [name]: value }))
    }
    const social = new FormData()
    const handleSocial = (e,id,idx) => {
        e.preventDefault()
        dispatch(getMessages({ messages: 'جارى التحديث', messageType: 'info', messageClick: true }))
        const socialDa = {
            social_id: id,
            value: socialData?.value
        }
        social.append(`social[${idx}][social_id]`, id)
        social.append(`social[${idx}][value]`, socialData?.value ? socialData?.value : socialLoading?.value)
        updateProfile._POST_UpdateProfile(userID,social).then(res => {
            dispatch(getMessages({ messages: res?.data?.message, messageType: 'success', messageClick: true }))
            checkupdate(false)
        }).catch(err => {
            dispatch(getMessages({ messages: err?.response?.data?.message, messageType: 'error', messageClick: true }))
            return err.response
        })
    }

    useEffect(() => {
      data?.filter(function(el) {
        return setSocialLoading(el)
      })
    }, [data])
    return (
        <div>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            {/* First Row [Name & Mobile & Email] */}
            {socialSite?.map((site,idx) => {
                return  <Form  key={site.id}>
                <Row className="LT-other-site mb-3" onChange={(e) => handleChange(e,site.id,idx)} >
                    {/* Site Name [Label] */}
                    <div className="LT-site-title">
                        <Form.Label className='mb-0 fLT-Regular-sB cLT-support2-text ' name='social_id'> {site.name} </Form.Label>
                    </div>
                    {/* Site Name [Input] */}
                    <div className="d-flex LT-site-name position=relative">
                        <i className='iLT-upload uLT-img-contain iLT-sC uLT-click ' onClick={(e)=>handleSocial(e,site.id,idx)} style={{position:'relative', top:'16px' , right:'36px'}} ></i>
                        <Form.Control name='value' defaultValue={socialLoading.title === site.name ? socialLoading.value : ''} className='uLT-bd-f-platinum-sA  uLT-f-radius-sB'  dir='ltr' placeholder="رابط الموقع" />
                    </div>
                </Row>
                </Form>
            })
            }
        </div>
    )
}

export default FlancerOtherJobSitesComponent
