import React, { useEffect, useState, useRef } from 'react'
import { config } from "react-spring";

const GalleryModal = ({ clickMe, clickStatus, datas }) => {
    const [setCarousel] = useState({
        goToSlide: 0,
        offsetRadius: 1,
        showNavigation: true,
        config: config.gentle
    })
    const elementRef = useRef();
    let any = datas
    useEffect(() => {
        clickMe && elementRef.current.click()
        clickStatus(false)
    }, [clickMe, clickStatus])
    return (
        <>
            {/* Modal [Button] */}
            <button ref={elementRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* Modal [Holder]*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* Modal [Sub-Holder]*/}
                <div className="modal-dialog" >
                    {/* Modal [lightBox [holder]]*/}
                    <div className="modal-content h-100 w-100">
                        {/* Modal Close Button [X]*/}
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* Images [Holder]*/}
                        <div className="overflow-auto d-flex align items-center h-100  gap-4 px-4">
                            {
                                any.map((el, i) => {
                                    return <div onClick={() => {
                                        setCarousel({ goToSlide: i })
                                    }} className="d=flex align-items-center" style={{ minWidth: '100%', height: '90%', marginBlock: "2rem" }} key={i}> {el.content}  </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryModal
