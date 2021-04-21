const knex = require("../db/connection");

function list() {
    return knex("movies").select("*")
}

function listMoviesShowing() {
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*", "mt.is_showing")
        .where({"mt.is_showing": true})
}

module.exports = {
    list,
    listMoviesShowing,
}