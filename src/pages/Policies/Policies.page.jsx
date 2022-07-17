import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { footerPages } from '../../core/services/PagesServices/PagesServices.core';

const PoliciesPage = () => {
    const [policies, setPolicies] = useState()
    useEffect(() => {
      let cancel = false
      if(cancel) return;
      footerPages._GET_FooterPagesSections().then(res => {
      res.data.data.filter(function (el) {
        return el.name == 'polices' && setPolicies(el)
      })
    })
      return () => {
        cancel = true
      }
    }, [])
  return (
    <div className='container px-0'>
        <div className='m-0 ' dangerouslySetInnerHTML={{__html: policies?.description}}>
        </div>
    </div>
  )
}

export default PoliciesPage