const movies = require('./db.json')
let globalID = 11

module.exports = {
    getMovies: (req, res) => {
    res.status(200).send(movies)
},

createMovie: (req, res) => {
    let newMovie = req.body

    newMovie.id = globalID

    movies.push(newMovie)
   

    res.status(200).send(movies)
     globalID++
}
}

updateMovie: (req, res) => {
    let {id} = req.params
    let {type} = req.body

    let index = movies.findIndex(movie => +movie.id === +id)

    if(movies[index].rating === 5 && type === 'plus'){
        res.status(400).send('Cannot go above 5')
    } else if(type === 'plus'){
        movies[index].rating++
        res.status(200).send(movies)
    } else if(type === 'minus' && movies[index].rating === 0){
        res.status(400).send('Cannot go below 0')
    } else if(type === 'minus') {
        movies[index].rating--
        res.status(200).send(movies)
    } else{
        res.sendStatus(400)
    }

   deletMovie: (req, res) => {
       let index = movies.findIndex(movie => +movie.id === +req.params.id)
       movies.splice(index, 1)
       res.status(200).send(movies)
   }
}