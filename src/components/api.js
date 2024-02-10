export {  
  getCards, 
  getInfoProfile,
  outInfoProfile,
  outCards,
  incCounter,
  decCounter,
  deleteCardData,
  updateAvatarProfile 
}



const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '84dae7a7-74d4-489a-a691-80cf4928969a',
    'Content-Type': 'application/json'
  }
}

function legoPromise(URL, settings) {
  return fetch(URL, settings)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });

}
// Для удобства сложили повторяющийся код в функцию

function getCards() {
  return legoPromise(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
}
// Зафетчмакали данные карточек от серевера


function getInfoProfile() {
  return legoPromise(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
}
// Зафетчмакали данные профиля от серевера



function outInfoProfile(name, description) {
  return legoPromise(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      about: description.value
    }),
  });
}
// Зафетчмакали данные профиля на сервер

function outCards(name, link) {
  return legoPromise(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value
    }),

  });
}
// Зафетчмакали данные карточек на сервер



function incCounter(cardId) {
  return legoPromise(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// Лайк Серверу

function decCounter(cardId) {
  return legoPromise(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Дизлайк Серверу

function deleteCardData(cardId) {
  return legoPromise(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Карточка удаляется по ID

function updateAvatarProfile(avatar) {
  return legoPromise(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}
// Отправляем на сервер ссылку на новую аватарку для профиля
