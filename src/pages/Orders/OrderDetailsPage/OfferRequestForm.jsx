import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ButtonShare from '../../../shared/Button/Button.shared'

const OfferRequestForm = ({ handleChange, errMessage, formValue, handleCLick, offerIsRequest }) => {
    return (
        <>
            <Form onSubmit={(e) => handleCLick(e)} className="d-grid gap-3 p-4 uLT-f-radius-sB cLT-platinum-bg ">
                <Row className="mb-3 flex-column gap-2 m-0">
                    <div className="d-flex gap-4 gap-md-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
                        <Form.Group as={Col} sm={12} md={6} controlId="formGridOfferPrice" className='position-relative px-0 d-grid gap-2' >
                            <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0"> قيمة العرض</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control value={formValue?.offerPrice} name="offerPrice" onChange={handleChange}
                                    className='uLT-bd-f-platinum-sA uLT-f-radius-sB position-relative' type='number'
                                    placeholder="000" />
                                <div className="fLT-Bold-sA cLT-main-text" style={{ position: 'absolute', left: '17px' }}>ريال</div>
                            </div>
                            {errMessage?.price && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2' style={{ top: '90px' }}>{errMessage?.price}</p>}
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={6} controlId="formGridOfferTime" className='position-relative px-0 d-grid gap-2' >
                            <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0"> مدة التنفيذ</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control value={formValue?.offerTime} name="offerTime" onChange={handleChange}
                                    className='uLT-bd-f-platinum-sA uLT-f-radius-sB position-relative' type='number'
                                    placeholder="000" />
                                <div className="fLT-Bold-sA cLT-main-text" style={{ position: 'absolute', left: '17px' }}>ايام</div>
                            </div>
                            {errMessage?.time && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2' style={{ top: '90px' }}>{errMessage?.time}</p>}
                        </Form.Group>
                    </div>
                </Row>
                {/* Details Request [Section] */}
                <div className="LT-details-request position-relative">
                    <Form.Label className="form-label fLT-Bold-sA cLT-main-text "> تفاصيل العرض</Form.Label>
                    <textarea
                        className="LT-offerDetails-textarea form-control fLT-Regular-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text" rows="3" placeholder="تفاصيل العرض"
                        name='description'
                        onChange={handleChange}
                        value={formValue?.description}
                        maxLength={100}
                    >
                    </textarea>
                    {errMessage?.description && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '0px' }}>{errMessage?.description}</p>}
                </div>
                {/* [Request Button */}
                <div className="d-flex justify-content-end  align-items-left">
                    <div className="shadow uLT-f-radius-sB">
                        <ButtonShare loading={offerIsRequest} btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB" textClasses="px-4 cLT-white-text fLT-Regular-sC" innerText=" إرسال" />
                    </div>
                </div>
            </Form>
        </>
    )
}

export default React.memo(OfferRequestForm)