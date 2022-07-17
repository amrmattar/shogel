import './OfferPriceForm.component.scss'
import ButtonShare from '../../../../shared/Button/Button.shared'
import Select from 'react-select'
import Upload from '../../../../shared/Upload/Upload.shared'
import $ from "jquery"
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlancerEditTagsComponent from '../../../FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component'
import { userOfferPrice } from '../../../../core/services/OfferPriceService/OfferPriceService.core'
import { Col, Form, Row } from 'react-bootstrap'
import { RegisterServices } from '../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core'
import UserFeedBackShared from '../../../../shared/UserFeedBack/UserFeedBack.shared'
import TextEditorShared from '../../../../shared/TextEditor/TextEditor.shared';

const OfferPriceForm = () => {
    const [offerCategory, getAllUserUpdate, messages] = useSelector((state) => [state.coreData.category, state.profileUpdate, state.messages])
    const errMessage = messages[0]?.messages
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const maxCharacters = 5000;
    const recivedData = JSON.parse(localStorage.getItem('TD'))
    const offerPrice = new FormData()
    const [content, setContent] = useState('')
    const [getDescriptionLength, setGetDescriptionLength] = useState(0)
    //TODO Get Location Input Value [Country-City-State]
    const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const fetchCountry = (country) => {
        setSelectedCountry(country.id)
    };
    const fetchCities = (city) => {
        setSelectedState(city.id)
    };
    const fetchState = (state) => {
        setSelectedCity(state.id)
    };
    const getCoreData = useMemo(() => {
        let modal = ['country', 'city', 'state']
        return RegisterServices.GET_RegisterData(modal, selectedCountry, selectedState).then(res => {
            setGetAllCountryFromResponse(res.data.data)
        })
    }, [selectedCountry, selectedState])
    useEffect(() => {
        return getCoreData
    }, [getCoreData])


    const [formData, setFormData] = useState({
        name: recivedData?.title ? recivedData?.title : '', description: recivedData?.description ? recivedData?.description : '', time: '',
        type_work: '', address: '',
    })
    const handleChange = (e) => {
        const { name, value } = e?.target
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const inputRef = useRef();
    const backButton = useRef();

    const [newfile, setFiles] = useState({ images: [], videos: [] })
    const [filenames, setNames] = useState([]);
    const fileHandler = (files) => {
        const extention = files
        for (let allFile of extention) {
            if (allFile.type.match('video/')) {
                newfile.videos.push(allFile)
            } else if (allFile.type.match('image/')) {
                newfile.images.push(allFile)
            }
        }
        const extension = files[0].name.split(".")[1]?.toLowerCase();
        if (extension !== undefined) {
            const fNames = Object.keys(files).map((name) => {
                return {
                    name: files[name].name,
                    icon: files[name].name.split(".")[1]?.toUpperCase().trim()
                };
            });
            setNames((prev) => [...prev, fNames].flat());
        } else {
            alert("file type not supported");
        }
    };
    const handleDelete = (e, fileNewName, i) => {
        const newfileImage = newfile.images.filter(element => element.name !== fileNewName);
        const newfileVideo = newfile.videos.filter(element => element.name !== fileNewName);
        setFiles({ images: newfileImage, videos: newfileVideo });
        setNames((prev) => filenames.filter((each, idx) => idx !== i))
    };

    const filePicker = (e) => {
        inputRef.current.click();
        offerPrice.append('images', e.target?.files)
    };

    const [advsCheck, setAdvsCheck] = useState(false)

    const handleCLick = async (e) => {
        e.preventDefault()
        dispatch(getMessages({ messages: 'جاري إرســـال طلبك', messageType: 'warning', messageClick: true }))
        setAdvsCheck(true)
        newfile.videos?.forEach((video, idx) => { return offerPrice.append(`videos[${idx}]`, video) });
        newfile.images?.forEach((image, idx) => { return offerPrice.append(`images[${idx}]`, image) });
        offerPrice.set('name', formData.name)
        offerPrice.set('description', content?.value ? content?.value : recivedData?.description)
        offerPrice.set('time', formData.time)
        offerPrice.set('type_work', formData.type_work)
        offerPrice.set('country_id', selectedCountry)
        offerPrice.set('city_id', selectedState)
        if (formData.type_work === 'offline') {
            offerPrice.set('address', formData.address)
            offerPrice.set('state_id', selectedCity)
        }
        getAllUserUpdate.category.forEach((cate, idx) => { offerPrice.append(`category[${idx}]`, cate) });
        userOfferPrice._POST_RequestOffer(offerPrice).then(res => {
            setAdvsCheck(false)
            dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
            if (res.data.status === 1) {
                localStorage.removeItem('TD')
                const timeAdvsOut = setTimeout(() => {
                    navigate(`/orders/page=${1}`)
                }, 800);
                return () => clearTimeout(timeAdvsOut)
            }
        }).catch(err => {
            setAdvsCheck(false)
            dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
        })
    }
    const handleGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    return (
        <>
            <UserFeedBackShared message={messages.messages} type={messages?.messageType} clickMe={messages?.messageClick} />
            {/* LT-request-form [Holder] */}
            <Form onSubmit={(e) => handleCLick(e)} className="LT-request-form-grid py-4 mt-4 px-4 uLT-f-radius-sB">
                {/* Address Request [Section] */}
                <Row className="mb-3 flex-column m-0">
                    <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
                        <Form.Group as={Col} sm={12} md={12} controlId="formGridPassword" className='position-relative px-0 d-grid gap-2' >
                            <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0"> عنوان الطلب</Form.Label>
                            <Form.Control value={formData?.name} name="name" onChange={handleChange}
                                className='uLT-bd-f-platinum-sA uLT-f-radius-sB fLT-Regular-sB' type='text'
                                placeholder="مثال : احتاج معقب .. برمجة تطبيق .. ترميم ملحق .. حفار قبو" />
                            {errMessage?.name && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2' style={{ top: '90px' }}>{errMessage?.name}</p>}
                        </Form.Group>
                    </div>
                </Row>
                {/* Details Request [Section] */}
                <div className="LT-details-request position-relative">
                    <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0"> اكتب تفاصيل الطلب</Form.Label>
                    <TextEditorShared data={recivedData?.description} setDescription={setContent}  setMaxLength={setGetDescriptionLength} characterLength={maxCharacters} />
                    <div className="text-start w-100 cLT-smoke-text">
                        {getDescriptionLength} /  {maxCharacters}
                    </div>
                    {errMessage?.description && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '0px' }}>{errMessage?.description}</p>}
                </div>
                {/* Time And Type Of Work [Section] */}
                <Row className="mb-3 flex-column m-0 pt-3">
                    <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row p-0">
                        <Form.Group as={Col} sm={12} md={6} controlId="formGridTime" className='position-relative px-0 d-grid gap-2' >
                            <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">مدة الشغل  <span className='fLT-Regular-sB cLT-smoke-text'>اختياري  </span></Form.Label>
                            <Form.Control value={formData?.time} name='time' onChange={handleChange}
                                className='uLT-bd-f-platinum-sA uLT-f-radius-sB' type='text'
                                placeholder="30 يوم" />
                            {errMessage?.time && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '-27px' }}>{errMessage?.time}</p>}
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={6} controlId="formGridTypeWork" className='position-relative px-0 pt-3 pt-md-0 d-grid gap-2' >
                            <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0"> نوع الشغل</Form.Label>
                            <div className="d-flex justify-content-around align-items-center uLT-bd-f-platinum-sA fLT-Regular-sB uLT-f-radius-sB cLT-main-text"
                                onChange={handleChange} >
                                <div className="fLT-Regular-sC  cLT-main-text text-center ">
                                    <label id="showCompo" className='uLT-click' >
                                        <input type="radio" name="type_work" value="online" datatype='anuone' alt='true' />
                                        <span> عن بعد</span>
                                    </label>
                                </div>
                                <div className="" style={{ width: '1px', height: '56px', backgroundColor: '#E9E9E9' }}></div>
                                <div className="fLT-Regular-sC  text-center ">
                                    <label id="showCompo" className='uLT-click' >
                                        <input type="radio" name="type_work" value="offline" datatype='anuone' alt='true' />
                                        <span> بالحضور </span>
                                    </label>
                                </div>
                            </div>
                            {errMessage?.type_work && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '-27px' }}>{errMessage?.type_work}</p>}
                        </Form.Group>
                    </div>
                </Row>
                {/* Location [Section] */}
                <Row className='d-flex align-items-center'>
                    {/* Country [Section] */}
                    <label className='fLT-Regular-sB cLT-support2-text mb-2'>موقعك</label>
                    <Form.Group as={Col} md={6} className="mb-3 position-relative " >
                        {/* Country [Option]  */}
                        <div className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`} >
                            <Select placeholder="البلد" className="uLT-f-radius-sB" options={getAllCountryFromResponse?.country}
                                onChange={fetchCountry}
                                getOptionLabel={country => country?.name} getOptionValue={country => country?.id}
                            />
                        </div>
                        {errMessage?.country_id && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '-27px' }}>{errMessage?.country_id}</p>}

                    </Form.Group>
                    {/* State [Section] */}
                    <Form.Group as={Col} md={6} className="mb-3 position-relative">
                        {/* State [Option]  */}
                        <div className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}>
                            <Select placeholder="المدينة" options={getAllCountryFromResponse?.city}
                                onChange={fetchCities}
                                getOptionLabel={city => city?.name} getOptionValue={city => city?.id} />
                        </div>
                        {errMessage?.city_id && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '-27px' }}>{errMessage?.city_id}</p>}
                    </Form.Group>
                </Row>
                {/* State Of Location Show Only Type Of Work === Offline */}
                {formData.type_work === 'offline' &&
                    <Row >
                        {/* City [Section] */}
                        <Form.Group as={Col} md={6} className="mb-3">
                            {/* City [Option]  */}
                            <Form.Label className='fLT-Regular-sB cLT-support2-text mb-2'> المنطقة </Form.Label>
                            <div className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}>
                                <Select placeholder="المنطقة" options={getAllCountryFromResponse?.state}
                                    onChange={fetchState} getOptionLabel={state => state?.name} getOptionValue={state => state?.id}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md={6} className="mb-3 " >
                            <Form.Label className='fLT-Regular-sB cLT-support2-text mb-2'>العنوان بالتفصيل</Form.Label>
                            <Form.Control onChange={handleChange} name="address" className='uLT-f-radius-sB uLT-bd-f-platinum-sA' type='text' value={formData?.address} placeholder="العنوان بالتفصيل" />
                        </Form.Group>
                    </Row>
                }
                {/* Upload Files [Holder] */}
                <div className="LT-upload-request">
                    <Upload inputRef={inputRef} isDrop={fileHandler} targetClick={filePicker} fileArr={filenames} handleDelete={handleDelete}
                        uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
                    />
                </div>

                {/* Skills-Grid [Holder] */}
                <div className="LT-skills-request~ d-grid gap-3 pb-4 h-100 position-relative">
                    {/* [Title] */}
                    <p className="m-0 fLT-Bold-sA cLT-main-text">ما هي المهارات  <span className='cLT-support1-text'>و المجالات</span> المطلوبة؟</p>
                    <FlancerEditTagsComponent
                        tags={offerCategory}
                        tagDescription={`ادخل ما يصل الي 5 مهارات تصف مشروعك علي افضل وجة سيستخدم المشتغلين هذه المهارات للعثوار علي المشاريع التي يهتمون بها و يختبرونها اكثر
                        `} />
                    {errMessage?.category && <p className='position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2' style={{ bottom: '10px' }}>{errMessage?.category}</p>}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    {/* [Back Button */}
                    <div className="d-flex justify-content-end  align-items-left">
                        <div className="shadow uLT-f-radius-sB" ref={backButton}>
                            <ButtonShare onClick={(e) => handleGoBack(e)} btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB" textClasses="px-4 cLT-white-text fLT-Regular-sC" innerText=" رجــوع" />
                        </div>
                    </div>

                    {/* [Request Button */}
                    <div className="d-flex justify-content-end  align-items-left">
                        <div className="shadow uLT-f-radius-sB">
                            <ButtonShare loading={advsCheck} btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB" textClasses="px-4 cLT-white-text fLT-Regular-sC" innerText=" إرسال" />
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default OfferPriceForm
