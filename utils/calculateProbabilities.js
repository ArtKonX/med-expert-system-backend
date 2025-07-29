const getSymptomIds = require('./getSymptomIds');
const getDataDiseases = require('./getDataDiseases');

module.exports = calculateProbabilities = async (selectedSymptoms) => {

    // Получаем id всех симптомов
    const symptomIds = await getSymptomIds(selectedSymptoms);

    // Получаем информацию о анализе на основе id симптомов
    const dataDiseases = await getDataDiseases(symptomIds);

    const diseases = {};

    // Высчитываем общие вес и вероятность для каждого диагноза
    for (const dataDisease of dataDiseases) {
        if (!diseases[dataDisease.disease_id]) {
            diseases[dataDisease.disease_id] = {
                totalWeight: 0,
                totalProbability: 0
            }
        }

        diseases[dataDisease.disease_id].totalWeight += dataDisease.weight;
        diseases[dataDisease.disease_id].totalProbability += dataDisease.probability;
    }

    const resultDisease = [];

    for (let diseaseId in diseases) {
        const diseasesData = diseases[diseaseId];
        // Делим общие вес и вероятность, чтобы получить конечную вероятность
        // диагноза
        const probability = diseasesData.totalProbability / diseasesData.totalWeight;
        resultDisease.push({
            id: diseaseId,
            probability: probability
        })
    }

    // Сортируем по вероятности и возвращаем
    return resultDisease.sort((a, b) => b.probability - a.probability);
}