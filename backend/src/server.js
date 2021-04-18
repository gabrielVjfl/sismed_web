const port = 8091

const express = require('express')

const app = express()

const cors = require('cors')

// const controllers = require('./controllers/MedicoController.js')

const route = require('./routes/Routes')
const path = require('path')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/files", express.static(path.join(__dirname, 'imgconfig', 'uploads')))

app.use('/api', route)

app.listen(port, () => {
    console.log('listening on port', port)
})
