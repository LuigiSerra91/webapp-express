const connection = require('../database/connection.js')

function index( req, res) {
    connection.query('SELECT * FROM movies', (err, results) => {
        if (err) return res.status(500).json({err: err})

            res.json({
                movies: results,
                count: results.length
            })

            
            
    })
}