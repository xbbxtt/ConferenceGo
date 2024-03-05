

window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/states/"

    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        console.log(data)

        const selectTag = document.getElementById('state')

        for (let state of data.states) {

            const option = document.createElement('option')
            option.value = state.abbreviation
            option.innerHTML = state.name
            console.log(state)
            selectTag.appendChild(option)
        }
    } else {
        console.error("cannot fetch url!")
    }


    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        console.log(json);


        const locationUrl = 'http://localhost:8000/api/locations/'
        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(locationUrl, fetchConfig)

        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
        }

    });
})
