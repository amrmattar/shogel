
import React,{ memo, useCallback, useEffect, useRef, useState } from 'react'
import './dash.scss'
// import { getMessaging,  onMessage } from '@firebase/messaging'
// import  { newMessaging } from '../core/firebase/firebase'

import UserFeedBackShared from '../shared/UserFeedBack/UserFeedBack.shared'
import { userOfferPrice } from '../core/services/OfferPriceService/OfferPriceService.core';
import { LabelProvider } from './FormStep/LabelDataContext/labelDataContext';
import MasterRegistrationComponent from './FormStep/MasterRegistrationComponent';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton,
    FacebookIcon,
    TwitterIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    WhatsappIcon
  } from 'react-share'
const Dash = () => {
    // const [person, setPerson] = useState([]);
    // // with add & remove filter
    // const CheckHandler = (e) => {
    //     const value = e.target.value;
    //     setPerson((prev) =>
    //         person.includes(value)
    //             ? prev.filter((cur) => cur !== value)
    //             : [...prev, e.target.value]
    //     );
    // };

// const [data, setData] = useState([])
// newMessaging.getToken().then((payload)=>{
//     localStorage.setItem('FCM',payload)
// })
// function showNotification(){
// const messaging  = getMessaging()
//     onMessage(messaging,(payload)=>{
//         const notification = new Notification(payload?.notification.title,{
//         title: payload?.notification.title,
//         body: payload?.notification.body,
//         icon: "https://shogol.sa/static/media/main-logo.ffac0435bf528ae63128.svg",

//     })
//     // setfirst(notification)
//     notification.onclick = function (ev){
//         ev.preventDefault()
//         window.open("http://localhost:3000/")
//     }
//     if(payload.notification){
//         setData(data => [...data,  payload.notification])
//     }
//    })
    
// }
// useEffect(() => {
// if(Notification.permission === 'granted'){
//     showNotification()
// } else if(Notification.permission !== 'denied') {
//     Notification.requestPermission().then(permission => {
//         if(permission === 'granted'){
//             showNotification()
//         }
//     })
// }
// }, [])



    return (
        <div>
            {/* {data?.map((notificate,idx)=>{
                return   <div key={idx} className='container d-flex align-items-center gap-3 p-3 mb-3 uLT-bd-f-platinum-sA uLT-f-radius-sB ' >
                <img src={notificate?.image} className='uLT-bd-f-platinum-sA uLT-f-radius  p-2' alt='' style={{ width: '50px', height: '50px' }} />
                <div className="d-flex flex-column justify-content-start ">
                    <div className="d-flex gap-2 gap-md-3 justify-content-between">
                        <p className="m-0 card-text fLT-Bold-sm-sB cLT-secondary-text text-nowrap">{notificate?.title} </p>
                    </div>
                <div className='LT-employed-description'>
                    <p className="m-0 fLT-Bold-sA cLT-support2-text">
                        {notificate?.body}
                    </p>
                </div>
                </div>
                </div>
            })} */}
            {/* <div className="d-flex flex-column align-items-center">
                <label htmlFor="mahmoud" className='d-flex gap-2 align-items-center ' >
                <p className='mb-0'>Mahmoud</p>
                <input type="checkbox" id='mahmoud' name="mahmoud" value="mahmoud" onClick={CheckHandler} />
                </label>
                <label htmlFor="Ahmed" className='d-flex gap-2 align-items-center ' >
                    <p className='mb-0'>Ahmed</p>
                    <input type="checkbox" id='Ahmed' name="Ahmed" value="Ahmed" onClick={CheckHandler} />
                </label>
                <label htmlFor="Allam" className='d-flex gap-2 align-items-center ' >
                <p className='mb-0'>Allam</p>
                <input type="checkbox" id='Allam' name="Allam" value="Allam" onClick={CheckHandler} />
                </label>
            </div> */}
{/* 
<LabelProvider>
                <MasterRegistrationComponent />
</LabelProvider> */}


            {/* <div className='d-flex flex-column  justify-content-center h-100 gap-2 '>
                    <FacebookShareButton className='uLT-advs-contact' url="https://shogol.sa/">
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton className='uLT-advs-contact' url="https://shogol.sa/">
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton className='uLT-advs-contact' url="https://shogol.sa/">
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    <LinkedinShareButton className='uLT-advs-contact' url="https://shogol.sa/">
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                    <FacebookMessengerShareButton className='uLT-advs-contact' url="https://shogol.sa/">
                        <FacebookMessengerIcon size={32} round={true} />
                    </FacebookMessengerShareButton>
                </div> */}
     
        </div>
    )

}

export default Dash


// newMessaging.getToken().then((payload)=>{
//     localStorage.setItem('FCM',payload)
// })
// function showNotification(){
// const messaging  = getMessaging()
//     onMessage(messaging,(payload)=>{
//         const notification = new Notification(payload?.notification.title,{
//         title: payload?.notification.title,
//         body: payload?.notification.body,
//         icon: "https://cdn.logo.com/hotlink-ok/logo-social.png",
//         // icon: "https://shogol.sa/static/media/main-logo.ffac0435bf528ae63128.svg"

//     })
//     notification.onclick = function (ev){
//         ev.preventDefault()
//         window.open("http://localhost:3000/")
//     }
// })
    
// }
// useEffect(() => {

// if(Notification.permission === 'granted'){
//     showNotification()
// } else if(Notification.permission !== 'denied') {
//     Notification.requestPermission().then(permission => {
//         if(permission === 'granted'){
//             showNotification()
//         }
//     })
// }

// }, [])