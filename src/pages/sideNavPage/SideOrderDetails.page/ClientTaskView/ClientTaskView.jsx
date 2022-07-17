import Upload from '../../../../shared/Upload/Upload.shared'
import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMessages } from '../../../../core/redux/reducers/Messages/Messages.core'
import { userOfferPrice } from '../../../../core/services/OfferPriceService/OfferPriceService.core'
import ButtonShare from '../../../../shared/Button/Button.shared'
import ReactStars from "react-rating-stars-component";
import { userOfferRequest } from '../../../../core/services/OfferRequestServices/OfferRequest.core'
import { reviewsCore } from '../../../../core/services/Reviews/Reviews.core'


const ClientTaskView = ({ data, refresIfDone }) => {
  const dispatch = useDispatch()

  // TODO Function Execute When You Typing The Reviews Comment  ** [Textarea] **
  const [doneByClient, setDoneByClient] = useState({ comment: '' })
  const handleChange = (e) => {
    const { name, value } = e?.target
    setDoneByClient(jobTaskDone => ({ ...jobTaskDone, [name]: value }))
  }

  // TODO Variable And State To Definition The Rating Icon And Action
  const [rateNumber, setRateNumber] = useState(1)
  const firstExample = {
    size: 30, count: 5, value: 1, edit: true, color: "#E9E9E9", isHalf: false,
    onChange: (newValue) => { setRateNumber(newValue) }
  };

  // TODO Function Execute If Client UnApproved The Received Task File After Done From Freelacner ** [Action Button] **
  const [rejectByClientCheck, setRejectByClientCheck] = useState(false)
  const handleRejectByClient = (e) => {
    e.preventDefault()
    setRejectByClientCheck(true)
    dispatch(getMessages({ messages: 'جاري إرســـال طلبك', messageType: 'warning', messageClick: true }))
    const reviewData = {
      user_id: data?.freelancer?.id,
      task_id: data?.id,
      review: rateNumber ? rateNumber : 1,
      comment: doneByClient?.comment
    }
    userOfferRequest._POST_RejectByClient(data?.id).then(res => {
      dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
      setRejectByClientCheck(false)
      if (res.data.status === 1) { reviewsCore._POST_Rating(reviewData) }
      refresIfDone(true)
    }).catch(err => {
      dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
      setRejectByClientCheck(false)
    })
  }

  // TODO Function Execute If Client Approved The Received Task File After Done From Freelacner ** [Action Button] **
  const [doneByClientCheck, setDoneBuClientCheck] = useState(false)
  const handleDoneByClient = (e) => {
    e.preventDefault()
    setDoneBuClientCheck(true)
    dispatch(getMessages({ messages: 'جاري إرســـال طلبك', messageType: 'warning', messageClick: true }))
    const reviewData = {
      user_id: data?.freelancer?.id,
      task_id: data?.id,
      review: rateNumber ? rateNumber : 1,
      comment: doneByClient?.comment
    }
    userOfferRequest._POST_DoneByClient(data?.id).then(res => {
      dispatch(getMessages({ messages: res.data.message, messageType: 'success', messageClick: true }))
      refresIfDone(true)
      setDoneBuClientCheck(false)
      if (res.data.status === 1) { reviewsCore._POST_Rating(reviewData) }
    }).catch(err => {
      dispatch(getMessages([{ messages: err.response.data.message, messageType: 'error', messageClick: true }]))
      setDoneBuClientCheck(false)
    })
  }
  // TODO Function Execute Opening New Tabs If User Click On File Or Photot  ** [Action Button] **
  const open = (url) => { window.open(url, '_blank').focus(); };

  return (
    <div className='d-flex flex-column gap-3'>
      {/* Action View To Client [Holder] */}
      <div className="d-flex flex-column gap-3 position-relative mt-4">
        <Form.Label className="form-label fLT-Bold-sA cLT-support2-text m-0"> تسليم الطلب</Form.Label>
        <p className='m-0 fLT-Regular-sB cLT-main-text'>{data?.done_file?.comment}</p>
      </div>
      <div className="d-flex gap-2 flex-wrap ">
        <Form.Label className="form-label fLT-Bold-sA cLT-support2-text m-0"> الملفات المرفقة</Form.Label>
        {data?.done_file?.file?.length !== 0 ?
          <>
            {data?.done_file?.file?.map(file => {
              return <div key={file.id} className="uLT-click LT-document-grid-holder justify-content-start " onClick={() => open(file.file)}>
                <i className={`iLT-file-download uLT-img-contain iLT-sA ms-2`}></i>
                <p className="mb-0 cLT-support2-text LT-document-ellipsis fLT-Regular-sB">{file.file.slice(62)}</p>
                {/* <Link  to={file?.file} download target={'_blank'} className="mb-0 cLT-support2-text LT-document-ellipsis fLT-Regular-sB">Download</Link> */}
              </div>
            })}
          </>
          :
          <p className='mb-0 fLT-Regular-sD w-100 text-center cLT-gray-text'>لا يوجد ملفات مرفقة</p>
        }
      </div>
      {/* Details Request [Section] */}
      <div className="d-flex flex-column gap-3 position-relative mt-4">
        <Form.Label className="form-label fLT-Bold-sA cLT-support2-text m-0"> تعليقك عن المشتغل</Form.Label>
        <textarea className=" form-control uLT-f-radius-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text" rows="1" placeholder="صف تعليقك"
          style={{ minHeight: '120px', resize: 'unset' }} name='comment' value={doneByClient?.comment} maxLength={500} onChange={handleChange} >
        </textarea>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-3 gap-sm-0 justify-content-sm-between w-100 flex-wrap" dir='ltr'>
        <ReactStars {...firstExample} />
       <p className='mb-0 fLT-Regular-sD text-end cLT-gray-text'>تقييــمك </p>
      </div>
      {/* [Request Button */}
      <div className="d-flex justify-content-between  align-items-left">
        <div className="">
          <ButtonShare
            loading={rejectByClientCheck}
            onClick={(e) => handleRejectByClient(e)}
            innerText="رفض التسليم" textClasses="fLT-Regular-sB px-3 cLT-support2-text"
            btnClasses=" cLT-platinum-bg py-2 px-4 uLT-f-radius-sB" />
        </div>
        <div className="shadow uLT-f-radius-sB">
          <ButtonShare
            loading={doneByClientCheck}
            onClick={(e) => handleDoneByClient(e)}
            btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
            textClasses="fLT-Regular-sB px-3 cLT-white-text " innerText="تم التسليم" />
        </div>

      </div>
    </div>
  )
}

export default ClientTaskView