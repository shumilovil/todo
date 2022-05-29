import React from "react";
import {EditFilled, DeleteFilled} from '@ant-design/icons'
import {message} from 'antd'
import './Controls.scss'
import {fetchTasks, removeTask, Task} from "../../../../redux/modules/tasks/slice";
import {useAppDispatch} from "../../../../redux/root";

type Props = {
    id: Task["id"]
}
const Controls = ({id}: Props) => {

    const dispatch = useAppDispatch()


    const handleDeleteClick = () => {
        dispatch(removeTask(id))
            .unwrap()
            .then(() => {
                message.success('Removed successfully')
                dispatch(fetchTasks())} )
            .catch(() => message.error('Something went wrong...'))
    }

    return (
        <div>
            <EditFilled className='edit-icon'/>
            <DeleteFilled className='remove-icon' onClick={handleDeleteClick}/>
        </div>
    )
}

export default Controls