const express = require('express')
const server = express()

const HOST = process.env.HOST
const PORT = process.env.PORT
const MoviesRouter = require('./routers/movies.js')


server.use('/api/movies', MoviesRouter);





server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}${PORT}`);
    
})

