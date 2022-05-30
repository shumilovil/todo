const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs');

app.use(cors())
app.use(express.json());


app.get('/tasks', (req, res) => {
    try {
        fs.readFile('db.json', 'utf8', (err, data) => {
            const taskList = JSON.parse(data).list;
            const sortedTaskList = taskList.sort((a, b) => b.id - a.id)
            res.status(200).json(sortedTaskList);
        })

    } catch (error) {
        res.status(500).json({message: 'Something is wrong, try again'});
    }
})

app.post('/tasks', (req, res) => {
    try {
        fs.readFile('db.json', 'utf8', (err, data) => {
            const taskList = JSON.parse(data).list;
            const sortedList = taskList.sort((a, b) => b.id - a.id)
            const lastId = sortedList[0] && sortedList[0].id || 0
            const {title, description, date} = req.body

            taskList.push({id: lastId + 1, title, description, date})

            const newJsonContent = JSON.stringify({list: taskList})

            fs.writeFile('db.json', newJsonContent, () => {
                res.status(201).json({message: 'added'});
            });
        })

    } catch (error) {
        res.status(500).json({message: 'Something is wrong, try again'});
    }
})

app.put('/tasks/:id', (req, res) => {
    try {
        fs.readFile('db.json', 'utf8', (err, data) => {
            const taskList = JSON.parse(data).list;
            const idToUpdate = Number(req.params.id)
            const taskToUpdate = taskList.find(task => task.id === idToUpdate)
            const {title, description, date} = req.body

            taskToUpdate.title = title
            taskToUpdate.description = description
            taskToUpdate.date = date

            const newJsonContent = JSON.stringify({list: taskList})

            fs.writeFile('db.json', newJsonContent, () => {
                res.status(201).json({message: 'updated'});
            });
        })

    } catch (error) {
        res.status(500).json({message: 'Something is wrong, try again'});
    }

})

app.delete('/tasks/:id', (req, res) => {
    try {
        fs.readFile('db.json', 'utf8', (err, data) => {
            const taskList = JSON.parse(data).list;
            const idToDelete = Number(req.params.id)
            const taskListAfterDelete = taskList.filter((task) => task.id !== idToDelete)
            const newJsonContent = JSON.stringify({list: taskListAfterDelete})

            fs.writeFile('db.json', newJsonContent, () => {
                res.status(200).json({message: 'deleted'});
            });
        })

    } catch (error) {
        res.status(500).json({message: 'Something is wrong, try again'});
    }
})


app.listen(5000, () => {
    console.log('CORS-enabled web server listening on port 5000')
})