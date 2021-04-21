const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Checks if the movieId param exists
 */
async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    };
    next({ status: 404, message: "Movie cannot be found." });
}

/**
 * if /movies?is_showing=true , list only the movies that are showing in theaters. 
 * 
 * if /movies list all movies
 */
async function list(req, res) {
    const { is_showing } = req.query
    if (is_showing === "true") {
        const listMovies = await service.listMoviesShowing();
        res.json({ data: listMovies })
    } else {
        const listMovies = await service.list();
        res.json({ data: listMovies });
    }
}

/**
 * 
 */
function read(req, res) {
    res.json({data: res.locals.movie})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read:[asyncErrorBoundary(movieExists), read],
}