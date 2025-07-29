const { db } = require('../db/db');

module.exports = getDataDiseases = async (symptomIds) => {
    // Шаблон количества симптомов
    const templateSymptoms = '(?, ' + symptomIds.map(() => '?').join(', ') + ')'

    const dataDiseases = await db.all(`SELECT sd.disease_id, sd.probability, sd.weight
        FROM symptom_disease sd JOIN symptoms s ON sd.symptom_id = s.id WHERE s.id IN
        ${templateSymptoms}`, [...symptomIds]);

    return dataDiseases
}