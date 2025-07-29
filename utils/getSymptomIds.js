const { db } = require('../db/db');

module.exports = getSymptomIds = async (symptomNames) => {

    // Шаблон количества симптомов
    const templateSymptoms = '(?, ' + symptomNames.map(() => '?').join(', ') + ')'

    const symptoms = await db.all(
        `SELECT id FROM symptoms WHERE name IN ${templateSymptoms}`, [...symptomNames]
    );

    // Возвращаем массив из айдишников симптомов
    return symptoms.map(symptom => symptom.id);
}