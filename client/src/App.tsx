import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch} from "./redux/root";
import {fetchTasks, tasksSelector} from './redux/modules/tasks/slice'
import {Row, Col} from 'antd';
import {useSelector} from "react-redux";
import TaskCard from "./components/TaskCard/TaskCard";


function App() {
    const dispatch = useAppDispatch()

    const tasks = useSelector(tasksSelector)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    // const dispatch = useAppDispatch()
    // const handleClick = () => {
    //     dispatch(fetchTasks())
    // }

    return (
        <div className="App">
            <Row justify='center'>
                <Col span={16}>
                    {tasks.map((task) => {
                       return <TaskCard key={task.id} task={task}/>
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default App;
