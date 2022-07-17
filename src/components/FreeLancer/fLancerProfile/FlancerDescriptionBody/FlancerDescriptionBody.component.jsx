import React, { useEffect } from 'react'

const FlancerDescriptionBodyComponent = ({ descriptionBody, fontSize }) => {
    return (
        <div >
            <p className={`m-0 ${fontSize} cLT-smoke-text text-ellipsis3`} dangerouslySetInnerHTML={{ __html: descriptionBody !== 'undefined' ? descriptionBody : 'لايوجد وصف للإعلان' }}></p>
        </div>
    )
}

export default FlancerDescriptionBodyComponent
