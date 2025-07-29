const calculateProbabilities = require('../../utils/calculateProbabilities');
const generateConclusion = require('../../utils/generateConclusion');

module.exports = QueryGetDiagnose = async (ctx) => {
    try {

        const { symptoms } = ctx.request.body;

        if (!symptoms || !Array.isArray(symptoms) || !symptoms.length) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: 'Список симптомов пуст'
            };
        }

        const probabilities = await calculateProbabilities(symptoms);
        const conclusion = await generateConclusion(probabilities, symptoms);

        ctx.status = 200;
        ctx.body = {
            success: true,
            data: conclusion,
            message: `Анализ завершен, диагноз получен`
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Произошла ошибка при формировании диагноза: ${err.message}`
        };
    }
}