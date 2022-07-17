import { Dialog } from "@mui/material"
import { useEffect, useState } from "react"
import { SwearServices } from "../../core/services/AuthServices/Method_Swear/Method_Swear.core"
import ButtonShare from "../Button/Button.shared"
import './Swearing.shared.scss'
const SwearingShared = ({ buttonLoading, mobileType, open, setSwearing, setLoginOpen, setSignupOpen, setMobileOpen }) => {

    const switchSignup = () => {
        setMobileOpen(false)
        setSignupOpen(false)
        setLoginOpen(false)
        setSwearing(false)
    }

    const [swearData, setSwearData] = useState(false)
    useEffect(() => {
        SwearServices.GET_SwearData('swear').then(res => setSwearData(res.data.data[0].value)).catch(err => err.response)
    }, [])

    return (
        <>
            <Dialog aria-labelledby="simple-dialog-title1" open={open ? open : false} >
                <div className='LT-swearing-holder'>
                    <div className="text-center">
                        <p className="fLT-Bold-sC cLT-secondary-text">اتفاقية العمولة</p>
                    </div>
                    <div className="d-flex flex-column align-items-start gap-4 fLT-Bold-sm-sB">
                        {swearData ? <div className="m-0" dangerouslySetInnerHTML={{ __html: swearData }} ></div> : 'loading'}
                    </div>
                    <div className="">
                        <ButtonShare loading={buttonLoading} onClick={switchSignup} innerText={'تم'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'} type={mobileType} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default SwearingShared