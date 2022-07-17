import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { getCertificateRate } from '../../core/redux/reducers/CertificateSkillsReducer.core';
import { getLanguageRate } from '../../core/redux/reducers/LanguageSkillsReducer.core';
import './Performance.shared.scss'

const PerformanceShared = ({ skillsType, type, setLevelValue, defaultNumber, status }) => {
    const dispatch = useDispatch()

    // Todo  Save Level  Value From Loop 
    const [starsSelected, setStar] = useState();

    // Todo  Function Return Level Section 
    const Star = ({ selected = false, onClick = f => f }) => (
        <div aria-required="true" className={`${selected ? "cLT-secondary-bg" : "cLT-platinum-bg "} && ${!status && 'uLT-click'} `} style={{ width: '20px', height: '20px', borderRadius: '2px' }}
            onClick={onClick} />
    );

    // Todo  Certificate Level Value
    const getCertificateRating = useCallback((e) => {
        dispatch(getCertificateRate(starsSelected))
    }, [dispatch, starsSelected])


    // Todo Language Level Value
    const getLanguageRating = useCallback((e) => {
        dispatch(getLanguageRate(starsSelected))
    }, [dispatch, starsSelected])

    // Todo  Fire Language And Certficate Level Value If Change
    useEffect(() => {
        skillsType === 'certificate' && getCertificateRating()
        skillsType === 'language' && getLanguageRating()
    }, [getLanguageRating, getCertificateRating, skillsType])

    // Todo Reset Level Value After Choose
    useEffect(() => {
        defaultNumber ? setStar(defaultNumber) : setStar(0)
        type && setLevelValue(false)
    }, [type, setLevelValue, defaultNumber])


    return (
        <div className="d-flex gap-3 align-items-center">
            {[1, 2, 3, 4, 5].map((n, i) => (
                <Star key={i} selected={i < starsSelected} onClick={!status ? (() => setStar(i + 1)) : undefined} />
            ))}
        </div>
    )
};

export default PerformanceShared