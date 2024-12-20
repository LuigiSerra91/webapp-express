const express = require('express')
const server = express()
const cors = require('cors')
const MoviesRouter = require('./routers/movies.js')
const NotFound = require('./middlewares/NotFound.js')
const ServerErrorHandler = require('./middlewares/ServerErrorHandler.js')
// Middleware per il parsing del JSON

server.use(cors());
server.use(express.json());
const HOST = process.env.HOST
const PORT = process.env.PORT



server.use('/api/movies', MoviesRouter);



server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}${PORT}`);

})




server.use(NotFound)
server.use(ServerErrorHandler)


