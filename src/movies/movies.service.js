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

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ movie_id })
        .first()
}

module.exports = {
    list,
    listMoviesShowing,
    read,
    
}