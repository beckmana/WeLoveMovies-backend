const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}


function update(updatedReviews) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReviews.review_id })
        .update(updatedReviews, "*");
}

function listCritics(criticId) {
    return knex("critics")
        .where({ "critics.critic_id": criticId })
        .first();
}

module.exports = {
    read,
    destroy,
    update,
    listCritics
}