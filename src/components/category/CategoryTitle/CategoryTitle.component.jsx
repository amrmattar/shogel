import React, { useCallback, useEffect, useState } from 'react'
import './CategoryTitle.component.scss'

const CategoryTitleComponent = ({ data }) => {
    const [sectionThreeData, setSectionThreeData] = useState({ title: '' })
    const handleSectionOne = useCallback(
        () => {
            data?.map((homeData) => {
                if (homeData?.section === '3') {
                    switch (homeData?.key) {
                        case 'home_section_3_title':
                            return setSectionThreeData(sectionThreeData => ({ ...sectionThreeData, title: homeData.value }))
                        default:
                            return false
                    }
                }
            })
        },
        [data],
    )
    useEffect(() => {
        let cancel = false
        if (cancel) return;
        handleSectionOne()
        return () => {
            cancel = true
        }
    }, [handleSectionOne])
    return (
        <>
            {/* Title Holder */}
            <div className="d-flex flex-column align-items-center pb-4">
                <p className="" dangerouslySetInnerHTML={{__html: sectionThreeData?.title}}>
                 </p>
                {/* Title line */}
                <div className="iLT-title-line iLT-sD uLT-img-contain p-3"></div>
            </div>
        </>
    )
}

export default CategoryTitleComponent
