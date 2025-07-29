const getDiseaseOnId = require('../utils/getDiseaseOnId');

module.exports = generateConclusion = async (probabilities, selectedSymptoms) => {

    const mainProbability = probabilities[0];
    const similarDiseases = [];

    for (let i = 1; i < probabilities.length; i++) {
        const similarDisease = {
            id: probabilities[i].id,
            disease: await getDiseaseOnId(probabilities[i].id),
            probability: probabilities[i].probability
        }

        similarDiseases.push(similarDisease)
    }

    const mainDisease = {
        id: mainProbability.id,
        disease: await getDiseaseOnId(mainProbability.id),
        probability: mainProbability.probability
    }

    const conclusion = {
        mainDisease,
        selectedSymptoms,
        similarDiseases
    }


    return conclusion;
}