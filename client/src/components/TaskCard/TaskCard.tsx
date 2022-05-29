import React from "react";
import type {Task} from '../../redux/modules/tasks/slice'
import {Card, Divider} from 'antd'
import './TaskCard.scss'
import Controls from "./blocks/Controls/Controls";

const formatDate = Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
}).format;

type Props = {
    task: Task
}
const TaskCard = ({task}: Props) => {
    const {id, title, description, date} = task

    return (
        <Card className='task-card' title={title} extra={<Controls id={id}/>}>
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

export default TaskCard