const predictionsWrapper = document.querySelector('.predictions-wrapper');
const predictionsGrid = document.querySelector('.predictions-grid');

function addPredictionItem(predictionData) {
    let predictionName = document.createElement('h5');
    let predictionItem = document.createElement('div');
    let predictionValues = document.createElement('div');
    let image = document.createElement('div');

    predictionName.innerHTML = predictionData.name;
    predictionName.className = 'prediction-name';

    predictionItem.className = 'prediction-item';
    predictionValues.className = 'prediction-values';
    
    image.className = 'prediction-image';
    image.innerHTML = predictionData.image;
    let svg = image.querySelector('svg')
    svg.setAttribute("width", "150px");
    svg.setAttribute("height", "150px");

    predictionItem.append(image);
    predictionValues.append(predictionName);
    predictionItem.append(predictionValues);
    
    for (let [propName, value] of Object.entries(predictionData.predictions)) {
        console.log(propName, value)
        let prediction = document.createElement('span');
        prediction.innerHTML = `<small>${propName}</small> ${value}`;
        prediction.className = 'prediction';
        predictionValues.append(prediction);
    }
    
    return predictionItem;
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

    for (let predictionData of predictions) {
        let predictionItem = addPredictionItem(predictionData);
        predictionsGrid.append(predictionItem);
    }
}