import TaskCard from "../TaskCard/TaskCard";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchTasks, Task, tasksSelector} from "../../redux/modules/tasks/slice";
import {useAppDispatch} from "../../redux/root";
import TaskModal from "../TaskModal/TaskModal";

const TaskList = () => {

    const dispatch = useAppDispatch()

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

    const tasks = useSelector(tasksSelector)

    const handleEditTask = useCallback((task: Task) => {
        setIsTaskModalOpen(true)
        setTaskToEdit(task)
    }, [])

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    return (
        <>
            {tasks.map((task) => {
                return <TaskCard key={task.id} task={task} onEdit={handleEditTask}/>
            })}
            <TaskModal
                isModalOpen={isTaskModalOpen}
                taskToEdit={taskToEdit}
                onOk={() => {
                    setIsTaskModalOpen(false)
                    setTaskToEdit(null)
                }}
                onCancel={() => {
                    setIsTaskModalOpen(false)
                    setTaskToEdit(null)
                }}/>
        </>
    )
}

export default TaskList