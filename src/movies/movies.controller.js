const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

module.exports = {
    list: asyncErrorBoundary(list)
}