import React, {useEffect, useState} from "react";
import {Modal, Input, DatePicker, DatePickerProps} from "antd";
import {Task} from "../../redux/modules/tasks/slice";
import moment from 'moment';
import './TaskModal.scss'

const {TextArea} = Input

type Props = {
    taskToEdit: Task | null
    isModalOpen: boolean
    onOk: () => void
    onCancel: () => void
}

const TaskModal = ({taskToEdit, isModalOpen, onOk, onCancel}: Props) => {

    const [datePickerValue, setDatePickerValue] = useState<moment.Moment | null>(null)

    const isEditMode = !!taskToEdit;

    const {title, date} = taskToEdit || {}

    const handleDateSelect: DatePickerProps['onChange'] = (date, dateString) => {
        console.log({date, dateString});
        setDatePickerValue(moment(date))
    };

    // initial datepicker value
    useEffect(() => {
        if (date) {
            setDatePickerValue(moment(date))
        }
    }, [isModalOpen, taskToEdit])

    // console.log({moment: moment(date)})

    return (
        <Modal
            visible={isModalOpen}
            title={isEditMode ? `Edit '${title}' task` : 'Add a new task'}
            okText='Save'
            onOk={onOk}
            onCancel={onCancel}
        >
            <div className='input-block'>
                <h3>Due date</h3>
                <DatePicker onChange={handleDateSelect} value={datePickerValue}/>
            </div>
            <div className='input-block'>
                <h3>Title</h3>
                <Input placeholder="title"/>
            </div>
           <div className='input-block'>
               <h3>Description</h3>
               <TextArea rows={4} placeholder="Description"/>
           </div>


        </Modal>
    )
}

export default TaskModal