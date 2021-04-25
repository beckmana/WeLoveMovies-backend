const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
 //   theater_id: ["movies", null, "theater_id"]
  });

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*", "m.*")
       .then(data => reduceMovies(data))
}

// function getTheatersAndMovies(movieId) {
//     return knex("theaters as t")
//         .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
//         .join("movies as m", "mt.movie_id", "m.movie_id")
//         .select("t.*", "mt.is_showing", "m.movie_id")
//         .where({ "m.movie_id": movieId })
//         .where({"mt.is_showing": true})
// }
  
module.exports = {
    list,
 //   getTheatersAndMovies
}