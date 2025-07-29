const { db } = require('../../db/db');

module.exports = QuerySaveResult = (ctx) => {
    try {

        const { symptoms, diagnose, probability, description, date } = ctx.request.body;

        db.all('INSERT INTO results (symptoms, diagnose, probability, description, created_at) VALUES (?, ?, ?, ?, ?)',
            [symptoms, diagnose, probability, description, date])


        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'Сохранение результатов прошло успешно'
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Произошла ошибка при сохранении результата: ${err.message}`
        };
    }
}