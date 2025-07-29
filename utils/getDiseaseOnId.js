const { db } = require('../db/db');

module.exports = getDiseaseOnId = async (id) => {

    const disease = await db.get(`SELECT * FROM diseases WHERE id LIKE (?)`, [`%${id}%`]);

    // Возвращаем запись диагноза по id
    return disease
}