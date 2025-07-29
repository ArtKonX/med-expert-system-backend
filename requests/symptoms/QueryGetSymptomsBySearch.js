const { db } = require('../../db/db');

module.exports = QueryGetSymptomsBySearch = async (ctx) => {
    try {

        // q - значение, по которому ищет user
        // симптомы, а dubbleList - данные, которые уже были найдены
        const { q, dubbleList } = ctx.request.query

        let symptomsByQ;

        if (!q.trim()) {
            symptomsByQ = []
        } else {
            if (!dubbleList) {
                symptomsByQ = await db.all('SELECT * FROM symptoms WHERE name LIKE ?', [`%${q}%`])
            } else {
                const allSymptomsByQ = await db.all('SELECT * FROM symptoms WHERE name LIKE ?', [`%${q}%`])

                symptomsByQ = []

                allSymptomsByQ.map(elem => elem.name).forEach(symptom => {
                    if (!dubbleList.includes(symptom) || !dubbleList.split(',').includes(symptom)) {

                        const findSymptom = allSymptomsByQ.find(el => el.name === symptom)
                        symptomsByQ.push(findSymptom)
                    }
                });
            }
        }

        ctx.status = 200;
        ctx.body = {
            success: true,
            data: symptomsByQ,
            message: `Все симптомы по запросу - ${q} получены`
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: `Произошла ошибка при получении симптомов: ${err.message}`
        };
    }
}