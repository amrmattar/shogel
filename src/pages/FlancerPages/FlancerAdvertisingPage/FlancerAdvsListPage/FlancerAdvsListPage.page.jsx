import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import './FlancerAdvsListPage.page.scss'
import FlancerAdvsListCardComponent from '../../../../components/FreeLancer/FlancerAdvertisingComponent/FlancerAdvsListCard/FlancerAdvsListCard.component'
import { advertisingLists } from '../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Helmet from 'react-helmet'
import { pageTitle } from '../../../../core/services/PageTitleServices/PageTitleServices.core'
import { useSelector } from 'react-redux'

const FlancerAdvsListPage = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [vistorUser, getSearchKey] = useSelector((state) => [state.authentication.loggedIn, state.search]);

    // Todo Block Of Get All Advertising Form 
    const [currentPage, setCurrentPage] = useState(null)
    const [userAdvsDetatils, setUserAdvsDetatils] = useState()
    //  Use MEMO Function To Store Whte API Return Advertising List Data
    const listOfUsersAdvs = useMemo(() => {
        return advertisingLists._GET_AllAdvsOffer(10, true, param.num, getSearchKey.searchStatus, getSearchKey?.searchKey).then(res => {
            setUserAdvsDetatils(res.data)
        }).catch(err => { return err.response })
    }, [param.num,getSearchKey?.searchKey ])
    // Fire UseMemo Function One Time And Listen To State Value If Change So Fire Again And Get New Response 
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!userAdvsDetatils?.data) {
                return listOfUsersAdvs
            }
        }, 1200);
        return () => clearTimeout(timeout)
    }, [userAdvsDetatils?.data, listOfUsersAdvs])


    // ? ------------------[[[START Block]]]-----------------
    //*TODO GET From API Response ==> Advertising Pagination

    const [pagination, setPagination] = useState();
    const handleAdvsPagination = useMemo(() => {
        setPagination(userAdvsDetatils?.pagination?.total_pages)
    }, [userAdvsDetatils?.pagination])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!userAdvsDetatils?.pagination) { return handleAdvsPagination }
        }, 1000);
        return clearTimeout(timeout)
    }, [userAdvsDetatils?.pagination, handleAdvsPagination])
    // TODO GET From API Response ==> Advertising Pagination
    // ? ------------------[[[END Block]]]-----------------
    // Todo Set Current Page 
    const getPageNumber = (e, value) => {
        setCurrentPage(param.num)
        navigate(`/advertising/page=${value}`)
        window.scrollTo({
            top: 250,
            behavior: 'smooth'
        })
    }

    // Condition For Show Loading Style Untill Data Return From API
    if (!userAdvsDetatils?.data) return <div className='d-flex justify-content-center align-items-center w-100 ' style={{ height: '100vh' }}>
        <div className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB" style={{ width: '200px', height: '200px' }}></div>
    </div>
    return (
        <>

            {/* Advertising List [Holder] */}
            <div className='cLT-white-bg p-3 w-100 d-flex flex-column'>
                {userAdvsDetatils?.data?.length !== 0 ?
                    <>
                        {/* User Feed Back Condition Untill Data Return  */}
                        {/* List Card Component [Loop]  */}
                        {userAdvsDetatils?.data?.map((advs, ix) => {
                            return <NavLink className="uLT-list-style" to={vistorUser && `/advertising/advertise-details/${advs.id}`} key={ix} > <FlancerAdvsListCardComponent data={advs} roll={vistorUser} />  </NavLink>
                        })}
                        {/* Pagination [Holder] */}
                        {userAdvsDetatils?.data?.length === 9 &&
                            <div className="container d-flex justify-content-center pt-4 mt-auto">
                                {/* Pagination [Number Navigate Holder] */}
                                <Stack>
                                    <Pagination dir='rtl' showFirstButton={true} showLastButton={true}
                                        count={pagination} page={parseInt(param?.num)}
                                        onChange={getPageNumber} size="large" />
                                </Stack>
                            </div>
                        }
                    </>
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center w-100  " style={{ height: '100vh ' }}>
                        <div className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB" style={{ width: '200px', height: '200px' }}></div>
                        <p className='mb-0 fLT-Bold-sD cLT-gray-text'>لا يوجد إعلانـــات</p>
                    </div>
                }
            </div>
        </>
    )
}

export default React.memo(FlancerAdvsListPage)
