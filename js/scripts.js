
/* retrieve data for 12 random employees from the API */

fetch("https://randomuser.me/api/?results=12")
    .then(result => result.json())
    .then(employees => {
        displayCard(employees)
    })

let galleryDiv = document.getElementById("gallery")

/* show each employee`s card on the page */
function displayCard(data) {
    let arrayEmployees = data.results
    /* iterate over array of employees -> get info for each employee */
    arrayEmployees.forEach((employee, index) => {

        /* create DOM and fill with info for each employee */
        let cardDiv = document.createElement('div')
        cardDiv.className = `card`
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

        /* open modal for one clicked employee */
        cardDiv.addEventListener("click", () => displayModal(arrayEmployees[index]))

        galleryDiv.appendChild(cardDiv)
    })
}

/* when clicking on an employee`s card open a modal with extra info */
function displayModal(employee) {

    /* create modal for one employee and fill with info */
    let modalContainer = document.createElement('div')
    modalContainer.className = 'modal-container'

    /* format date from API to display birthday info for employee */
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

    /* remove modal if user clicks on button to close modal*/
    let closeButton = document.getElementById("modal-close-btn")
    closeButton.addEventListener("click", () => modalContainer.remove())

}



