import React from 'react'

const FlancerDocumentationComponent = ({ status, documentName }) => {
    return (
        <div className='d-flex align-items-center gap-2'>
            <i className={`d-flex  ${status === 1 ? 'iLT-documentation' : 'iLT-documentation-not-valid'} iLT-sC uLT-img-contain`}></i>
            <p className='mb-0 fLT-Regular-sB cLT-support2-text' >{documentName}</p>
        </div>
    )
}

export default FlancerDocumentationComponent
