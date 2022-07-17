
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FlancerNavigatorComponent from '../../components/FreeLancer/flancerAsideSettingComponent/FlancerNavigatorComponent/flancerNavigator.component'
import { getUpdateDataForm } from '../../core/redux/reducers/UpdateProfileReducer/UpdateProfileReducer.core'
import AsideFreelancerPage from '../../pages/AsideFreelancerPage/AsideFreelancerPage.pages'

const SideNav = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const formData = new FormData()
        const data = formData.append('avatar', e)
        dispatch(getUpdateDataForm({ avatar: data }))
    }
    return (
        <>
            {location.pathname.includes('/account_management/') &&
                <AsideFreelancerPage isHandleChange={(e) => handleChange(e)} setMarginTop={-70} setMarginBottom={10} selector={<FlancerNavigatorComponent />} />
            }
        </>
    )
}

export default SideNav
