const { db } = require('../../db/db');
const calculateProbabilities = require('../../utils/calculateProbabilities');
const generateConclusion = require('../../utils/generateConclusion');

module.exports = QueryGetFullResultById = async (ctx) => {
    try {
        const { id } = ctx.request.query;

        // Находим результат по id
        const result = await db.get('SELECT * FROM results WHERE id LIKE (?)',
            [id])

        const probabilities = await calculateProbabilities(result.symptoms.split(','));
        const conclusion = await generateConclusion(probabilities, result.symptoms);

        ctx.status = 200;
        ctx.body = {
            success: true,
            data: conclusion,
            message: `Успешное получение развернутого диагноза по id результата`
        };

    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Ошибка получения развернутого результата по id: ${err.message}`
        };
    }
}