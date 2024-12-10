const cardTemplate = document.querySelector('#card-template')
const placesList = document.querySelector('.places__list')

function createCard(cardParams, deleteEvent) {
    const card = cardTemplate.content.querySelector('.card').cloneNode(true)
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector(".card__image")

    cardDeleteButton.addEventListener('click', deleteEvent);
    cardDeleteButton.targetElement = card;
    card.querySelector('.card__title').textContent = cardParams.name;
    cardImage.src = cardParams.link
    cardImage.alt = cardParams.link
    return card;
}

function deleteCard(event) {
    event.currentTarget.targetElement.remove();
}

initialCards.forEach((cardParams) => {
    placesList.append(createCard(cardParams, deleteCard));
});
