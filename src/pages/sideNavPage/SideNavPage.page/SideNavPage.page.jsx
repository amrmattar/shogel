import React from 'react';
import MagazinesFilterComponent from '../../../components/SideFiltration/MagazinesFilter/MagazinesFilter.component';
import LocationFilterComponent from '../../../components/SideFiltration/LocationFilter/LocationFilter.component'
import RateViewShared from '../../../shared/Rating/RateView.shared'
import SwitchStatusComponent from '../../../components/SideFiltration/SwitchStatus/SwitchStatus.component';
import RangePriceFilterComponent from '../../../components/SideFiltration/RangePriceFilter/RangePriceFilter.component';
import MostinUsingFilterComponent from '../../../components/SideFiltration/MostinUsingFilter/MostinUsingFilter.component';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import FiltrationShared from '../../../shared/Filtration/Filtration.shared';

const SideNavPage = () => {
  const mediaMD = useMediaQuery({ query: `(max-width: 992px)` })
  const location = useLocation()
  const fakeArr = [
    {
      id: 1,
      title: 'برمجة',
      iconName: 'iLT-arrow-up',
      subTitle: [
        {
          id: 10,
          "name": "ويب",
          list: [
            {
              name: 'تصميم مواقع'
            },
            {
              name: 'انشاء موقع الكتروني'
            },
            {
              name: 'تصميم مواقع'
            },
            {
              name: 'انشاء موقع الكتروني'
            },
          ]
        },
        {
          "name": "تطبيقات جوال",
          list: [
          ]
        },
        {
          "name": "برامج",
          list: [

          ]
        },
      ]
    },
    {
      id: 2,
      iconName: 'iLT-arrow-up',
      title: 'تصوير جرافيك',
    },
    {
      id: 3,
      iconName: 'iLT-arrow-up',
      title: 'تصميم',
    },
    {
      id: 4,
      iconName: 'iLT-arrow-up',
      title: 'تصوير فيديو',
    },
    {
      id: 5,
      iconName: 'iLT-arrow-up',
      title: 'صوتيات',
    },
    {
      id: 6,
      iconName: '',
      title: 'ترجمة',
    },
    {
      id: 7,
      iconName: '',
      title: 'تسويق',
    },
    {
      id: 8,
      iconName: '',
      title: 'حسابات التواصل الاجتماعي',
    },
    {
      id: 9,
      iconName: '',
      title: 'برامج ميايكروسوفت',
    },
    {
      id: 10,
      iconName: '',
      title: 'عروض بريزنتيشن',
    },
  ]
  return (
    <div>
      {/* {mediaMD ?
        <div className='px-3'>
          <p className='fLT-Bold-sA text-nowrap'>البحث باسم المشتغل</p>
          <div className='d-flex align-items-center gap-3'>
            <div className="w-100 d-flex align-items-center justify-content-between uLT-bd-f-platinum-sA" style={{ borderRadius: '24px', border: '1px solid #E9E9E9' }}>
              <input className="uLT-outline-0 uLT-border-0 mx-3 cLT-gray-text" type="search" placeholder="ابحث هنا" />
              <i className="iLT-search-bar iLT-sA uLT-img-contain m-3" />
            </div>
            <FiltrationShared sideNavComponent={
              <>
                <div className="d-flex flex-column gap-3">
                  <p className='m-0 fLT-Bold-sA text-nowrap'>الاشغال والمجلات</p>
                  <div className="">
                    {fakeArr.map((el) => {
                      return <MagazinesFilterComponent key={el?.id} APIs={el} />
                    })}
                  </div>
                </div>

                <div className="uLT-bd-f-platinum-sA my-3"></div>
                <div className="d-flex flex-column gap-3">
                  <p className='m-0 fLT-Bold-sA text-nowrap'>الموقع</p>
                  <LocationFilterComponent />
                </div>
                {location.pathname !== '/orders' &&
                  <>
                    <div className="uLT-bd-f-platinum-sA my-3"></div>
                    <div className="d-flex flex-column gap-3">
                      <p className='m-0 fLT-Bold-sA text-nowrap'>التقيم</p>
                      <RateViewShared />
                    </div>
                  </>
                }
                {location.pathname !== '/orders' &&
                  <>
                    <div className="uLT-bd-f-platinum-sA my-3"></div>
                    <div className="d-flex flex-column gap-3">
                      <p className='m-0 fLT-Bold-sA text-nowrap'>متصل</p>
                      <SwitchStatusComponent />
                    </div>
                  </>}
                {location.pathname !== '/employed' &&
                  <>
                    <div className="uLT-bd-f-platinum-sA my-3"></div>
                    <div className="d-flex flex-column gap-3">
                      <p className='m-0 fLT-Bold-sA text-nowrap'>تحديد السعر</p>
                      <RangePriceFilterComponent rangId={"selectRagne"} />
                    </div>
                    {location.pathname !== '/orders' &&
                      <div className="d-flex flex-column gap-3">
                        <p className='m-0 fLT-Bold-sA text-nowrap'>مراجعة </p>
                        <RangePriceFilterComponent rangId={"confirmRange"} />
                      </div>
                    }
                  </>
                }
                <div className="uLT-bd-f-platinum-sA my-3"></div>
                <div className="d-flex flex-column gap-3">
                  <p className='m-0 fLT-Bold-sA text-nowrap'>الأكثر استخدام </p>
                  <MostinUsingFilterComponent />
                </div>
              </>
            } />
          </div>
        </div>
        :
        <div className='cLT-white-bg d-flex flex-column gap-3 p-4'>
          <div className="d-flex flex-column gap-3">
            <p className='m-0 fLT-Bold-sA text-nowrap'>الاشغال والمجلات</p>
            <div className="">
              {fakeArr.map((el) => {
                return <MagazinesFilterComponent key={el?.id} APIs={el} />
              })}
            </div>
          </div>
          <div className="uLT-bd-f-platinum-sA my-3"></div>
          <div className="d-flex flex-column gap-3">
            <p className='m-0 fLT-Bold-sA text-nowrap'>الموقع</p>
            <LocationFilterComponent />
          </div>
          {location.pathname !== '/orders' &&
            <>
              <div className="uLT-bd-f-platinum-sA my-3"></div>
              <div className="d-flex flex-column gap-3">
                <p className='m-0 fLT-Bold-sA text-nowrap'>التقيم</p>
                <RateViewShared />
              </div>
            </>
          }
          {location.pathname !== '/orders' &&
            <>
              <div className="uLT-bd-f-platinum-sA my-3"></div>
              <div className="d-flex flex-column gap-3">
                <p className='m-0 fLT-Bold-sA text-nowrap'>متصل</p>
                <SwitchStatusComponent />
              </div>
            </>}
          {location.pathname !== '/employed' &&
            <>
              <div className="uLT-bd-f-platinum-sA my-3"></div>
              <div className="d-flex flex-column gap-3">
                <p className='m-0 fLT-Bold-sA text-nowrap'>تحديد السعر</p>
                <RangePriceFilterComponent rangId={"selectRagne"} />
              </div>
              {location.pathname !== '/orders' &&
                <div className="d-flex flex-column gap-3">
                  <p className='m-0 fLT-Bold-sA text-nowrap'>مراجعة </p>
                  <RangePriceFilterComponent rangId={"confirmRange"} />
                </div>
              }
            </>
          }
          <div className="uLT-bd-f-platinum-sA my-3"></div>
          <div className="d-flex flex-column gap-3">
            <p className='m-0 fLT-Bold-sA text-nowrap'>الأكثر استخدام </p>
            <MostinUsingFilterComponent />
          </div>
        </div>
      } */}
    </div>

  )

};

export default SideNavPage;
