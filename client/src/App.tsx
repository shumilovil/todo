import React from 'react';
import './App.css';
import {Row, Col} from 'antd';
import TaskList from "./components/TaskList/TaskList";


function App() {

    return (
        <div className="App">
            <Row justify='center'>
                <Col span={16}>
                    <TaskList/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
