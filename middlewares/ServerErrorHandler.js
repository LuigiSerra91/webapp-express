const ServerErrorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Somenthing Broke')
}

module.exports = ServerErrorHandler