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
 * returns the theaters showing the movie by movieId
 */
async function moviesShowingInTheaters(req, res) {
    const moviesShowingInTheaters = await service.moviesShowingInTheater(req.params.movieId);
    res.json({data: moviesShowingInTheaters})
}


async function movieReviewsWithCritics(req, res) {

    const movieReviews = await service.getReviews(req.params.movieId);
    //console.log(movieReviews)
    const addCritic = movieReviews.map(async (movieReview) => ({
        ...movieReview,
        critic: await service.getCritics(movieReview.critic_id),
    }));
    
    const movieReviewsAndCritics = await Promise.all(addCritic)

   // console.log(movieReviewsAndCritics)

    res.json({data: movieReviewsAndCritics})
}



/**
 * returns all movie by id
 */
function read(req, res) {
    res.json({data: res.locals.movie})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    moviesShowingInTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(moviesShowingInTheaters)],
    movieReviewsWithCritics: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieReviewsWithCritics)]
}


// const getFollowers = async name => {
//     const data = await fetch(`https://api.github.com/users/${name}`);
//     const { followers } = await data.json();
//     return followers;
//   };
  
// const formatData= async () => {
//     const arr = ["rocktimsaikia", "aholachek", "benawad"];
//     const result = await arr.map(async i => ({
//         name: i,
//         followers: await getFollowers(i)
//       });

//     return result;
//   };