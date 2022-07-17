import React, { useEffect } from 'react'
import { Form, Row } from 'react-bootstrap'
import ButtonShare from '../../../../shared/Button/Button.shared'
import './Mobile.component.scss'
import ReactPhoneInput from 'react-phone-input-2'

const MobileComponent = ({ mobileType, onChange, buttonLoading, iclick, handleClick }) => {
    // TODO Function Set Maxlength To Mobile Input
    useEffect(() => {
        const attrTimeOut = setTimeout(() => {
            const mobileInput = document.getElementById('mobileNumber')
            mobileInput.focus()
            mobileInput.setAttribute("maxLength", 14)
        }, 400);
        return () => clearTimeout(attrTimeOut)
    }, [])
    return (
        <div className='LT-mobile-holder'>
            <div className="imLT-main-logo uLT-img-contain my-3 w-100 one" > </div>
            <Row className="gap-3 two">
                {/* Mobile Number */}
                <Form.Group md="12" controlId="formGridMobile" className=' '>
                    <Form.Label className='fLT-Regular-sB cLT-support2-text mb-3'>رقم الجوال</Form.Label>
                    <div dir='ltr' onChange={onChange} >
                        <ReactPhoneInput onEnterKeyPress={iclick} inputProps={{ name: 'mobile', id: 'mobileNumber' }}
                            countryCodeEditable={false}
                            placeholder='0000' country={'sa'} onlyCountries={['sa']}
                            masks={{ sa: '.........' }}

                        />
                    </div>
                </Form.Group>
                <p className='mb-0 fLT-Regular-sA cLT-support2-text'>برجاء إدخال رقم الجوال لإرسال رمز التأكيد</p>
            </Row>
            <div className="three">

                <ButtonShare onClick={handleClick} loading={buttonLoading} innerText={'ارســــــال'} btnClasses={'three cLT-secondary-bg'} textClasses={'py-2 cLT-white-text fLT-Regular-sB'}
                    type={mobileType} />
            </div>
        </div>
    )
}

export default MobileComponent