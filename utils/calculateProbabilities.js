const getSymptomIds = require('./getSymptomIds');
const getDataDiseases = require('./getDataDiseases');

module.exports = calculateProbabilities = async (selectedSymptoms) => {

    const symptomIds = await getSymptomIds(selectedSymptoms);
    console.log('symptomIds', symptomIds)

    const dataDiseases = await getDataDiseases(symptomIds);
    console.log('dataDiseases', dataDiseases)

    const diseases = {};

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
        const probability = diseasesData.totalProbability / diseasesData.totalWeight;
        resultDisease.push({
            id: diseaseId,
            probability: probability
        })
    }

    return resultDisease.sort((a, b) => b.probability - a.probability);
}