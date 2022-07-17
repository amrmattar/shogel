import React from 'react'
import ButtonShare from '../../../shared/Button/Button.shared'
import './TaskButtonControllerFilter.component.scss'

const TaskButtonControllerFilterComponent = ({stopTask,editTask, deleteTask}) => {

    return (
        <>
            <div className='d-grid gap-3 w-100 '>
                <div className=" d-flex gap-2 ">
                    <ButtonShare onClick={stopTask} innerText="ايقاف" iconName={'iLT-my-task-pause iLT-sA'} textClasses="fLT-Regular-sB px-1 fLT-Regular-sD cLT-secondary-text" btnClasses="uLT-bd-f-secondary-sA p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                    <ButtonShare onClick={editTask} innerText="تعديل" iconName={'iLT-my-edit-white iLT-sA'} textClasses="fLT-Regular-sB px-1 cLT-white-text" btnClasses="cLT-secondary-bg p-2 justify-content-center d-flex align-items-center gap-2 uLT-f-radius-sB" />
                </div>
                <div className=" ">
                    <ButtonShare onClick={deleteTask} innerText="حذف" textClasses="fLT-Regular-sD  py-1" iconName={'LT-task-deleteIcon iLT-sA'}
                        btnClasses="p-2 d-flex justify-content-center align-items-center gap-2 uLT-f-radius-sB LT-task-deleteButton cLT-support-text" />
                </div>
            </div>
        </>
    )
}

export default TaskButtonControllerFilterComponent