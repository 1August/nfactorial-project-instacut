const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/app', require('./routes/routes'))

const PORT  = config.get('port') || 5000

const start = async () => {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Database is ready!'))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}... \n Server: http://localhost:5000/\n Client: http://localhost:3000/`))
    }catch (e){
        console.error('Server error:', e.message)
        process.exit(1)
    }
}
start()