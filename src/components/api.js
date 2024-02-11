const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "84dae7a7-74d4-489a-a691-80cf4928969a",
    "Content-Type": "application/json",
  },
};

// Для удобства сложили повторяющийся код в функцию
function request(URL, settings) {
  return fetch(URL, settings).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Зафетчмакали данные карточек от серевера
function getCards() {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
}

// Зафетчмакали данные профиля от серевера
function getInfoProfile() {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
}

// Зафетчмакали данные профиля на сервер
function setProfileInfo(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

// Зафетчмакали данные карточек на сервер
function postCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
}

// Лайк Серверу
function setLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// Дизлайк Серверу
function removeLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Карточка удаляется по ID
function deleteCardData(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Отправляем на сервер ссылку на новую аватарку для профиля
function updateAvatarProfile(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}

export {
  getCards,
  getInfoProfile,
  setProfileInfo,
  postCard,
  setLike,
  removeLike,
  deleteCardData,
  updateAvatarProfile,
};
