const { db } = require('../../db/db');

module.exports = QueryGetAllSymptoms = async (ctx) => {
    try {

        const symptoms = await db.all('SELECT * FROM symptoms')

        ctx.status = 200;
        ctx.body = {
            success: true,
            data: symptoms,
            message: 'Все симптомы получены'
        };

    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Произошла ошибка при получении симптомов: ${err.message}`
        };
    }
}