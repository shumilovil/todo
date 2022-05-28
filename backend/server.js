const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.get('/test', function (req, res) {
    res.status(201).json({test: 'test'});
})

app.listen(5000, () => {
    console.log('CORS-enabled web server listening on port 5000')
})