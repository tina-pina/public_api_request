
/* retrieve data for 12 employees */

fetch("https://randomuser.me/api/?results=12")
    .then(result => result.json())
    .then(employees => {
        displayCard(employees)
    })

let galleryDiv = document.getElementById("gallery")

function displayCard(data) {
    let arrayEmployees = data.results
    arrayEmployees.forEach((employee, index) => {
        let cardDiv = document.createElement('div')
        cardDiv.className = `card`

        /* open modal for one clicked employee */
        cardDiv.addEventListener("click", () => displayModal(arrayEmployees[index]))

        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        `
        galleryDiv.appendChild(cardDiv)
    })
}

function displayModal(employee) {
    let modalContainer = document.createElement('div')
    modalContainer.className = 'modal-container'

    let dob = new Date(employee.dob.date)
    let dobString = `${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`

    modalContainer.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dobString}</p>
            </div>
        </div>
    `
    galleryDiv.appendChild(modalContainer)

    let closeButton = document.getElementById("modal-close-btn")
    closeButton.addEventListener("click", () => modalContainer.remove())

}



