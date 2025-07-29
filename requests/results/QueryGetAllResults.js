const { db } = require('../../db/db');

module.exports = QueryGetAllResults = async (ctx) => {
    try {

        const results = await db.all('SELECT * FROM results');

        ctx.status = 200;
        ctx.body = {
            success: true,
            data: results,
            message: 'Все результаты получены'
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Произошла ошибка при получении результатов: ${err.message}`
        };
    }
}