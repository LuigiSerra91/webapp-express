const express = require('express')
const server = express()
const MoviesRouter = require('./routers/movies.js')
const NotFound = require('./middlewares/NotFound.js')
const ServerErrorHandler = require('./middlewares/ServerErrorHandler.js')
const HOST = process.env.HOST
const PORT = process.env.PORT



server.use('/api/movies', MoviesRouter);






server.use(NotFound)
server.use(ServerErrorHandler)

server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}${PORT}`);

})
