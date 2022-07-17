import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import RegisterationComponent from '../../../components/auth/Register/Registeration.component';
import './RegistrationPage.pages.scss'
import ButtonShare from '../../../shared/Button/Button.shared';
import { useDispatch } from 'react-redux'

import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RegisterServices } from '../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core';
import FlancerEditTagsComponent from '../../../components/FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component';
import { authAction } from '../../../core/services/AuthServices/AuthActions/AuthActions.core';
import UserFeedBackShared from '../../../shared/UserFeedBack/UserFeedBack.shared';
import { getMessages } from '../../../core/redux/reducers/Messages/Messages.core';
import { SwearServices } from '../../../core/services/AuthServices/Method_Swear/Method_Swear.core';
const RegistrationPage = (props) => {
    //TODO Data from Reducers
    const [registerData, locationID, categorySkills, messages, getMobileNumber] = useSelector((state) => [
        state.register,
        state.locationID,
        state.registerCategory,
        state.messages,
        state.mobileOTP
    ]);
    const RegisterationFormData = {
        username: registerData?.username,
        fullname: registerData?.fullname,
        email: registerData?.email,
        password: registerData?.password,
        job_name_id: registerData?.job_name_id,
        role_id: registerData.role_id,
        country_id: registerData?.country_id,
        city_id: registerData?.city_id,
        state_id: registerData?.state_id,
        gender_id: registerData.gender_id,
        nationality_id: registerData.nationality_id,
        mobile: getMobileNumber.mobile.split("+").join("")
    }
    //TODO Switch Between [Login - Register] From
    const { open, setLoginOpen, setSignupOpen, setMobileOTPOpen, setMobileOpen } = props;
    const dispatch = useDispatch()
    const switchLogin = (event) => {
        setSignupOpen(false)
        setMobileOTPOpen(false)
        setMobileOpen(false)
        setLoginOpen(true)
    }
    const handleClose = () => {
        setLoginOpen(false)
        setSignupOpen(false)
        setMobileOTPOpen(false)
        setMobileOpen(false)
    };

    useEffect(() => {
        return () => {
            setLoginOpen(false)
        }
    }, [])

    // Todo Get All Data Freom API
    const [registrationData, setRegistrationData] = useState('')
    const getRegistrationService = useCallback(() => {
        let modal = ['country', 'city', 'state', 'level', 'category', 'gender', 'nationality', 'jobName']
        RegisterServices.GET_RegisterData(modal, locationID?.countriesID, locationID?.citiesID).then(res => {
            setRegistrationData(res.data.data)
        })
    }, [locationID?.countriesID, locationID?.citiesID])
    useEffect(() => {
        getRegistrationService()
    }, [getRegistrationService])
    // Todo Get Freelnacer Reducer Data And Add To Form
    const getFreelancerData = useCallback(() => {
        if (registerData.role_id == 3) {
            const freeLancerData = {
                ...RegisterationFormData,
                nationality_number: registerData?.nationality_number,
                category: categorySkills,
            }
            return freeLancerData
        }
    }, [RegisterationFormData, registerData.role_id, registerData?.nationality_number, categorySkills])
    // Todo Get Freelnacer Reducer Data And Add To Form
    const getCompanyData = useCallback(() => {
        if (registerData.role_id == 4) {
            const companyData = {
                ...RegisterationFormData,
                category: categorySkills,
                commercial_number: registerData.commercial_number,
            }
            return companyData
        }
    }, [RegisterationFormData, registerData.commercial_number, registerData.role_id, categorySkills])

    // Todo Get Client Reducer Data And Add To Form
    const getClientData = useCallback(() => {
        const data = {
            ...RegisterationFormData,
            nationality_number: registerData?.nationality_number,
        }
        return data
    }, [registerData?.nationality_number, RegisterationFormData])

    // Todo Checked Role And Condition of Checked [Agree, Submit Button]
    const [check, setCheck] = useState(false)
    const [activeAgree, setActiveAgree] = useState(true)
    const [activeButton, setActiveButton] = useState(true)

    //  ==> Toggle Show Account Type <==
    const show = useCallback((e) => {
        switch (e?.target.value) {
            case "2":
                setActiveAgree(false)
                break;
            case "3":
                setCheck(false)
                setActiveAgree(true)
                setActiveButton(true)
                break;
            case "4":
                setCheck(false)
                setActiveAgree(true)
                setActiveButton(true)
                break;
            default:
                setActiveAgree(false)
                break;
        }
    }, [setActiveAgree])
    useEffect(() => {
        show()

    }, [show])
    // Condition If Select Client Checked
    const ifClient = useCallback(() => {
        check === true ? setActiveButton(false) : setActiveButton(true)
    }, [check])
    useEffect(() => {
        ifClient()
    }, [ifClient, activeAgree])

    // Condition If Select Freelancer Checked 
    const isCompany = useCallback(() => {
        if (categorySkills?.length === 0 || registerData?.job_name_id === undefined || registerData?.commercial_number === "") {
            setCheck(false)
            setActiveAgree(true)
            setActiveButton(true)
        } else {
            setActiveAgree(false)
        }
    }, [categorySkills, registerData?.job_name_id, registerData?.commercial_number])
    // Condition If Select Freelancer Checked 
    const isFreelancer = useCallback(() => {
        if (categorySkills?.length === 0 || registerData?.job_name_id === undefined || registerData?.nationality_number === "") {
            setCheck(false)
            setActiveAgree(true)
            setActiveButton(true)
        } else {
            setActiveAgree(false)
        }
    }, [categorySkills, registerData?.job_name_id, registerData?.nationality_number])
    const handleFreelancerKind = useCallback(
        () => {
            switch (registerData?.role_id) {
                case "3":
                    return isFreelancer()
                case "4":
                    return isCompany()
                case "2":
                    return setActiveAgree(false)
                default:
                    return setActiveAgree(true)
            }
        },
        [registerData?.role_id, isFreelancer, isCompany],
    )
    useEffect(() => {
        handleFreelancerKind()

    }, [handleFreelancerKind])

    const getInputChecked = (e) => {
        setCheck(e?.target?.checked)
    }

    // Todo Submit Form 
    const [registerCheck, setRegisterCheck] = useState(false)
    const getFinallyFrom = (e) => {
        e.preventDefault()
        setRegisterCheck(true)
        if (registerData.role_id == 2) {
            RegisterServices.POST_RegisterData(getClientData()).then(
                res => {
                    if (res.data.status === 1) {
                        dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                        setTimeout(() => {
                            setRegisterCheck(false)
                            setSignupOpen(false)
                            setMobileOTPOpen(false)
                            setMobileOpen(false)
                            setLoginOpen(false)
                        }, 800);
                    } else {
                        setSignupOpen(true)
                        setRegisterCheck(false)
                    }
                }
            ).catch((err) => {
                setRegisterCheck(false)
                dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
            })
        } else if (registerData.role_id == 3) {
            RegisterServices.POST_RegisterData(getFreelancerData()).then(res => {
                if (res.data.status === 1) {
                    dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                    setTimeout(() => {
                        setRegisterCheck(false)
                        setSignupOpen(false)
                        setMobileOTPOpen(false)
                        setMobileOpen(false)
                        setLoginOpen(false)
                    }, 800);
                } else {
                    setSignupOpen(true)
                    setRegisterCheck(false)
                }
            }).catch(err => {
                dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
                setRegisterCheck(false)
            })
        } else if (registerData.role_id == 4) {
            RegisterServices.POST_RegisterData(getCompanyData()).then(res => {
                if (res.data.status === 1) {
                    dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
                    setTimeout(() => {
                        setRegisterCheck(false)
                        setSignupOpen(false)
                        setMobileOTPOpen(false)
                        setMobileOpen(false)
                        setLoginOpen(false)
                    }, 800);
                } else {
                    setSignupOpen(true)
                    setRegisterCheck(false)
                }
            }).catch(err => {
                dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
                setRegisterCheck(false)
            })
        }
    }
    return (
        <>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick?.messageClick} />
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose} >
                <DialogTitle id="simple-dialog-title">  <p className="mb-0 fLT-Bold-sA ">إنشاء حساب جديد</p> </DialogTitle>
                <DialogContent className="">
                    {/* Form Holder */}
                    <Form onSubmit={getFinallyFrom} className='container px-0 my-4 mimi'>
                        {/* Section Of Form Input */}
                        <div className="">
                            <RegisterationComponent isChanged={(e) => show(e)}
                                getFormData={registrationData}
                                messages={messages[0]?.messages}
                                freelancerTagsSection={
                                    registerData.role_id == 3 &&
                                    <div className='pt-4'>
                                        <div className="mb-4">
                                            <label className='fLT-Regular-sB cLT-support2-text mb-2'>مجالات الاختصاص <span className='cLT-danger-text'>*</span></label>
                                            <FlancerEditTagsComponent tags={registrationData?.category} type={'Register'} />
                                        </div>
                                    </div>
                                }
                                companySection={
                                    registerData.role_id == 4 &&
                                    <div className='pt-4'>
                                        <div className="mb-4">
                                            <label className='fLT-Regular-sB cLT-support2-text mb-2'>مجالات الاختصاص <span className='cLT-danger-text'>*</span></label>
                                            <FlancerEditTagsComponent tags={registrationData?.category} type={'Register'} />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                        <div className="mt-4">
                            {/* Agree Terms [Section] */}
                            <label className='d-flex justify-content-center align-items-center gap-2 gap-sm-3 mb-4' >
                                <input id="acceptTerms" checked={check} disabled={activeAgree} type="checkbox" className='uLT-click' name="radio-button" onChange={(e) => getInputChecked(e)} style={{ width: '24px', height: '24px' }} />
                                <p className='mb-0  LT-agree-condition cLT-support2-text termsText'> اوافق علي الشروط والاحكام </p>
                            </label>
                            {/* Registeration  [Button] */}
                            <div className="d-flex justify-content-center align-items-center w-100 mt-4" >
                                <div className="uLT-f-radius-sB LT-register-button  d-flex align-items-center">
                                    <ButtonShare loading={registerCheck} btnClasses="cLT-secondary-bg" textClasses="py-2 cLT-white-text fLT-Regular-sB" innerText="تسجيل" type={activeButton} />
                                </div>
                            </div>
                            {/* Route To Login Form  [Button] */}
                            <div className="d-flex align-items-center justify-content-center mt-3 gap-1">
                                <p className='m-0 fLT-Bold-sm-sA cLT-main-text'> لديك حساب </p>
                                <Button onClick={switchLogin} className='px-0' >
                                    <p className='uLT-list-style fLT-Bold-sm-sA cLT-secondary-text '>تسجيل الدخول</p>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default React.memo(RegistrationPage)