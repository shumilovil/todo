import React from "react";
import type {Task} from '../../redux/modules/tasks/slice'
import {Card, Divider, message} from 'antd'
import './TaskCard.scss'
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {fetchTasks, removeTask} from "../../redux/modules/tasks/slice";
import {useAppDispatch} from "../../redux/root";

const formatDate = Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
}).format;

type Props = {
    task: Task
    onEdit: (task: Task) => void
}
const TaskCard = ({task, onEdit}: Props) => {

    const dispatch = useAppDispatch()

    const {id, title, description, date} = task

    const renderControls = () => {

        const handleEditClick = () => {
            onEdit(task)
        }

        const handleDeleteClick = () => {
            dispatch(removeTask(id))
                .unwrap()
                .then(() => {
                    message.success('Removed successfully')
                    dispatch(fetchTasks())
                })
                .catch(() => message.error('Something went wrong...'))
        }

        return (
            <div>
                <EditFilled className='edit-icon' onClick={handleEditClick}/>
                <DeleteFilled className='remove-icon' onClick={handleDeleteClick}/>
            </div>
        )
    }

    return (
        <Card className='task-card' title={title} extra={renderControls()}>
            <div className='task-card__content'>
                <div className='task-card__date'>
                    {formatDate(new Date(date))}
                </div>
                <Divider type='vertical' className='task-card__divider' />
                <div className='task-card__description'>
                    {description}
                </div>
            </div>
        </Card>
    )
}

export default React.memo(TaskCard)