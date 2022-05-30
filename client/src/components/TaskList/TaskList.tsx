import TaskCard from "../TaskCard/TaskCard";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchTasks, tasksSelector} from "../../redux/modules/tasks/slice";
import {useAppDispatch} from "../../redux/root";
import {Button, Input} from "antd";
import './TaskList.scss'
import TaskModal from "../TaskModal/TaskModal";

const TaskList = () => {

    const dispatch = useAppDispatch()

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')

    const tasks = useSelector(tasksSelector)

    const tasksToRender = searchInputValue
        ? tasks.filter((task) => task.title.toLowerCase().includes(searchInputValue.toLowerCase()))
        : tasks

    const taskNodes = tasksToRender.map((task) => {
        return <TaskCard key={task.id} task={task}/>
    })

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value)
    }

    return (
        <>
            <h1 className='title'>My ToDo List</h1>
            <Button
                size='large'
                className='add-button'
                type='primary'
                onClick={() => setIsTaskModalOpen(true)}
            >
                + Add task
            </Button>
            <Input
                className='search-input'
                size='large'
                placeholder='search by title'
                value={searchInputValue}
                onChange={handleSearchChange}
            />
            {taskNodes}
            <TaskModal
                isModalOpen={isTaskModalOpen}
                onOk={() => setIsTaskModalOpen(false)}
                onCancel={() => {
                    setIsTaskModalOpen(false)
                }}
            />
        </>
    )
}

export default TaskList