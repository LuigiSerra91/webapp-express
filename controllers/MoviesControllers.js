// Importa il modulo per la connessione al database
const connection = require('../database/connection.js')

// Funzione per ottenere tutti i film dal database
function index(req, res) {
    // Esegui la query SQL per selezionare tutti i film dalla tabella 'movies'
    connection.query('SELECT * FROM movies', (err, results) => {
        // Se c'è un errore durante la query, restituisci un errore con codice 500
        if (err) return res.status(500).json({ err: err })

        // Se la query ha successo, restituisci i film e il loro numero totale
        res.json({
            movies: results,
            count: results.length // Restituisce la lunghezza del risultato, ossia il numero di film
        })
    })
}

// Funzione per ottenere i dettagli di un singolo film
function show(req, res) {
    // Estrae l'id del film dai parametri della richiesta
    const id = req.params.id

    // Definisce la query per ottenere i dettagli del film
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // Definisce la query per ottenere le recensioni associate al film
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id=?'

    // Esegui la query per ottenere il film con l'id specificato
    connection.query(sql, [id], (err, results) => {
        // Se c'è un errore, restituisci un errore con codice 500
        if (err) return res.status(500).json({ err: err })

        // Se non viene trovato alcun film, restituisci un errore con codice 404
        if (results.length == 0) return res.status(404).json({ err: 'movie not found' })

        // Esegui la query per ottenere le recensioni associate al film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            // Se c'è un errore nella query delle recensioni, restituisci un errore con codice 500
            if (err) return res.status(500).json({ err: err })

            // Crea un oggetto 'movie' che unisce i dati del film con le recensioni
            const movie = {
                ...results[0], // Aggiungi i dettagli del film
                reviews: reviewsResults // Aggiungi le recensioni del film
            }

            // Restituisci i dettagli del film con le recensioni
            res.json(movie)
        })
    })
}

// Funzione per aggiungere una recensione a un film
function review(req, res) {
    // Estrae l'id del film dalla richiesta, assicurandosi che sia un numero
    const movie_id = Number(req.params.id)

    // Estrae i dati della recensione dal corpo della richiesta
    const { name, vote, text } = req.body

    // Definisce la query SQL per inserire una nuova recensione nella tabella 'reviews'
    const sql = 'INSERT INTO `reviews` SET name=?, vote=?, text=?, movie_id=?';

    // Esegui la query per inserire la recensione
    connection.query(sql, [name, vote, text, movie_id], (err, result) => {
        // Se c'è un errore nell'inserimento, restituisci un errore con codice 500
        if (err) return res.status(500).json({ err })

        // Se l'inserimento va a buon fine, restituisci un successo con codice 201
        return res.status(201).json({ success: true })
    })
}

// Esporta le funzioni per utilizzarle in altri moduli
module.exports = {
    index,
    show,
    review
}
