import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoutes = () => {
    const Location = useLocation()
    const userID = useSelector(state => state.userData.id)
    const kindOfUser = localStorage.getItem('valid')
    return (
        kindOfUser === '1' ? <Outlet /> : kindOfUser === null ? <Outlet /> : <Navigate to={`/account_management/my-edit-account/${userID}`} state={{ from: Location }} replace />
    )

}

export default PrivateRoutes