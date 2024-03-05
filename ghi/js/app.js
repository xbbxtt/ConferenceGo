function createCard(name, description, pictureUrl, startTime, endTime) {
    return `
    <div class="col-md-4" class="shadow p-3 mb-5 bg-white rounded">
        <div class="shadow p-0 mb-3 bg-white rounded">
            <div class="card">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                ${startTime} - ${endTime}
                </div>
            </div>
        </div>
    </div>
    `;
  }



window.addEventListener('DOMContentLoaded', async () => {


    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok){
            console.error("response is bad");
        } else {
            const data = await response.json();

            for ( let conference of data.conferences){

                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);

                if (detailResponse.ok) {
                    const details = await detailResponse.json();

                    console.log(details)

                    const description = details.conference.description;
                    const title = details.conference.name
                    const pictureUrl = details.conference.location.picture_url;
                    const startTime = new Date(details.conference.starts).toLocaleDateString('en-US')
                    const endTime = new Date(details.conference.ends).toLocaleDateString('en-US')
                    const html = createCard(title, description, pictureUrl, startTime, endTime)

                    const column = document.querySelector('.row')
                    column.innerHTML += html
                }
            }
        }
    } catch (e) {
        console.error("url is invalid");
    }


});
