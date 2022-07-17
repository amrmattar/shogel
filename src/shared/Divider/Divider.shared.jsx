import React from 'react'

const Divider = ({ spaceSize }) => {
    return (
        <div className={`${spaceSize}`}>

        </div>
    )
}

export default React.memo(Divider)
