import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import superagent from 'superagent';
// const superagent = require('superagent');


// const axios = require('axios').default;


function App() {

    const handleClick = async () => {


        const res = await superagent.delete('http://localhost:5000/tasks/10')
        console.log(res)

        return res
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button onClick={handleClick}>Test</button>
            </header>
        </div>
    );
}

export default App;
