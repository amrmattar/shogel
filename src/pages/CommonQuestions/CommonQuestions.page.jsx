import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { footerPages } from '../../core/services/PagesServices/PagesServices.core';

const CommonQuestionsPage = () => {
    const [commonQuestions, setCommonQuestions] = useState()
    useEffect(() => {
      let cancel = false
      if(cancel) return;
      footerPages._GET_FooterPagesSections().then(res => {
      res.data.data.filter(function (el) {
        return el.name == 'about us' && setCommonQuestions(el)
      })
    })
      return () => {
        cancel = true
      }
    }, [])
  return (
    <div className='container px-0'>
        <div className='m-0' dangerouslySetInnerHTML={{__html: commonQuestions?.description}}>
        </div>
    </div>
  )
}

export default CommonQuestionsPage