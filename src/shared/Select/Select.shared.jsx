import React from 'react'

const SelectShared = ({ labelName = '', isOptions = [], defaultValue = '', onChange, placeholder = '', inputId = '' }) => {
    return (
        <div>
            {/* Job Title [Label] */}
            <label htmlFor={inputId} className='fLT-Regular-sB cLT-support2-text mb-3'>{labelName}</label>
            {/* Job Title Option [Holder]  */}
            {/* Job Title [datalist]  */}
            <datalist id={'suggestions'} className='w-100  uLT-bd-f-platinum-sA uLT-f-radius-sB fLT-Regular-sB p-3'>
                {isOptions?.map((optVal, ix) => {
                    return optVal ? <option key={ix} label={optVal?.name} >  {optVal?.name} </option> : <option key={ix} label={'no option'} >  {'no option'} </option>
                })
                }
                <option >First option</option>
            </datalist>
            {/* Job Title [Input]  */}
            <div className="position-relative cLT-white-bg">
                <div className="arrow"></div>
                <input placeholder={placeholder}
                    id={inputId}
                    defaultValue={defaultValue}
                    onChange={onChange} list={'suggestions'}
                    className='w-100 uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB p-3' />
            </div>
        </div>
    )
}

export default SelectShared

