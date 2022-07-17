import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AdvertisingFav } from '../../../../../core/services/Favourite/AdvertisingFavourite/AdvertisingFavourite.core'
import FlancerAdvsListCardComponent from '../../../FlancerAdvertisingComponent/FlancerAdvsListCard/FlancerAdvsListCard.component'

const FlancerFavoritePayComponent = () => {
    const [allFavoriteList, setAllFavoriteList] = useState()
    const favoriteList = useMemo(() => {
        AdvertisingFav._GET_AdvsFavourite().then(res => { setAllFavoriteList(res.data.data) })
    }, [])
    useEffect(() => {
        const favTimeOut = setTimeout(() => {
            if(!allFavoriteList){
                return favoriteList
            }
        }, 1000);
        return ()=> clearTimeout(favTimeOut)
    }, [allFavoriteList])

    if (!allFavoriteList) return <div className='position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4' >
    <div className="App-logo-border-loading" ></div>
    <div className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB" style={{ width: '60px', height: '60px' }}></div>
</div>
    return (
        <>
        {allFavoriteList ? 
        <>
            {allFavoriteList?.map((favList, ix) => {
                return <NavLink className="uLT-list-style" to={`/advertising/advertise-details/${favList.id}`} key={ix} > <FlancerAdvsListCardComponent data={favList} />  </NavLink>
            })}
        </>
         :
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100" >
            <div className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB" style={{ width: '200px', height: '200px' }}></div>
            <p className='mb-0 fLT-Bold-sD cLT-gray-text'>لا يوجد  قائمة بالمفضلة</p>
        </div>
        }
        </>
    )
}

export default FlancerFavoritePayComponent
