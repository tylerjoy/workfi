document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('searchBox');
    const autoCompleteResults = document.getElementById('autoCompleteResults');

    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value;

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
                    });
                    autoCompleteResults.appendChild(suggestion);
                });
            })
            .catch(error => console.error('Error fetching autocomplete suggestions:', error));
    });
});