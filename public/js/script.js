const locationForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const errorMessageParagraph = document.querySelector('#error-message');
const successMessageParagraph = document.querySelector('#success-message');

locationForm.addEventListener('submit', e => {
    e.preventDefault();

    errorMessageParagraph.textContent = '';
    successMessageParagraph.textContent = '';

    fetch(`/weather?address=${locationInput.value}`).then(response => {
        response.json().then(data => {
            if(data.errorMessage) {
                errorMessageParagraph.textContent = data.errorMessage;
            } else {
                successMessageParagraph.textContent = `The temperature in ${data.location} is ${data.temperature} ºC`;
            }
        });
    });
});