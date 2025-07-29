const { db } = require('../../db/db');

module.exports = QueryRemoveResult = async (ctx) => {
    try {
        const { id } = ctx.request.body;

        const result = await db.run('DELETE FROM results WHERE id = ?', [id]);

        if (result.success) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: 'Успешное удаление результата'
            };
        }
    } catch (err) {
        console.log(`Ошибка удаления результата: ${err.message}`)
    }
}