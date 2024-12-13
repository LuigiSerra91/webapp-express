const connection = require('../database/connection.js')

function index(req, res) {
    connection.query('SELECT * FROM movies', (err, results) => {
        if (err) return res.status(500).json({ err: err })

        res.json({
            movies: results,
            count: results.length
        })


    })
}

function show(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id=?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })
        if (results.length == 0) return res.status(404).json({ err: 'movie not found' })


        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })

            //console.log('reviews', reviewsResults);
            const movie = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(movie)

        })
    })


}

function review(req, res) {
    const movie_id = Number(req.params.id)
    const { username, review, vote } = req.body
    const now = new Date()
    const reviewDate = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`

    const sql = "INSERT INTO `reviews` SET username=?, review=?, vote=?, book_id=?, date=?"

    connection.query(sql, [username, review, vote, movie_id, reviewDate], (err, result) => {
        if (err) return res.status(500).json({ err })
        return res.status(201).json({ success: true })

    })
}

module.exports = {
    index,
    show,
    review
}