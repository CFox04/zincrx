import { hidePredictions, addPredictions } from "./addPredictions.js";
import { clearErrorMessage, displayError } from "./error.js";

const form = document.getElementById('single-smiles-form');
const smilesInput = document.getElementById('smiles-input');

function resetElements() {
    hidePredictions();
    clearErrorMessage();
}

form.onsubmit = (event) => {
    event.preventDefault();

    resetElements();
    
    fetch('/predictions', {
        method: 'POST',
        body: JSON.stringify({'smiles': smilesInput.value}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((data) => addPredictions(data))
    .catch((err) => (displayError(err)))
}