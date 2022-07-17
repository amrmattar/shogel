import React from 'react'

const MostinUsingFilterComponent = () => {
    const mostUseArr = [
        {
            id: 1,
            title: 'الاحداث ',
        },
        {
            id: 2,
            title: 'بالقرب مني',
        },
        {
            id: 3,
            title: 'حسابات موثقة',
        },
        {
            id: 4,
            title: 'الأكثر رد علي الطلبات',
        }
    ]
    return (
        <div>
            {mostUseArr.map(use => {
                return <label className="d-flex align-items-center gap-3 justify-content-start w-100 uLT-click " key={use.id} >
                    <input type="checkbox" name="one" />
                    <span className='fLT-Regular-sB cLT-gray-text'>{use.title}</span>
                </label>
            })
            }
        </div>
    )
}

export default MostinUsingFilterComponent
