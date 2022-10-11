const predictionsWrapper = document.querySelector('.predictions-wrapper');
const predictionsTable = document.querySelector('.predictions-table');

function addPredictionRow(predictionData) {
    let row = predictionsTable.insertRow();
    let image = row.insertCell(0)
    let value1 = row.insertCell(1);
    let value2 = row.insertCell(2);
    let value3 = row.insertCell(3);

    image.innerHTML = predictionData.image;
    value1.innerHTML = predictionData.value1;
    value2.innerHTML = predictionData.value2;
    value3.innerHTML = predictionData.value3;
    
    return row
}

export function showPredictions() {
    if (predictionsWrapper.className.includes('hidden')) {
        predictionsWrapper.classList.remove('hidden');
    }
}
export function hidePredictions() {
    if (!predictionsWrapper.className.includes('hidden')) {
        predictionsWrapper.classList.add('hidden');
    }
}

export function addPredictions(predictions) {
    showPredictions();
    console.log(predictions)

    for (let predictionData of predictions) {
        addPredictionRow(predictionData);
    }
}