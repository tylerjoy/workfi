// autocomplete functionality: runs client-side on the search input on the /profile page
document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('searchBox'); //search input takes in user text
    const autoCompleteResults = document.getElementById('autoCompleteResults'); //div that holds the autocomplete reccomendations
    const submitButton = document.getElementById('submitButton')

    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value; //take the value of the search input, this is triggered every time the user presses a key while the input box is active

        // Make a request to the server to get autocomplete suggestions
        fetch(`/autocomplete?query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Display autocomplete suggestions
                autoCompleteResults.innerHTML = '';
                data.forEach(result => {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = result;
                    suggestion.addEventListener('click', function () {
                        searchBox.value = result;
                        autoCompleteResults.innerHTML = '';
                        autoCompleteResults.classList.add('invisible')
                        submitButton.classList.remove('hidden')

                    });

                    autoCompleteResults.appendChild(suggestion).classList.add('my-5');
                });
                autoCompleteResults.classList.remove('invisible')
                autoCompleteResults.classList.add('visible')
            })
            .catch(error => console.error('Error fetching autocomplete suggestions:', error));
    });
});

