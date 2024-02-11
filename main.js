(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"84dae7a7-74d4-489a-a691-80cf4928969a","Content-Type":"application/json"}};function t(e,t){return fetch(e,t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function r(r){return t("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers})}function n(r){return t("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers})}var o={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function c(e,t,r){var n=t.querySelector(".".concat(r.id,"-error"));r.classList.remove(e.inputErrorClass),n.classList.remove(e.errorClass),n.textContent=""}function a(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(r.disabled=!1,r.classList.remove(e.inactiveButtonClass)):(r.classList.add(e.inactiveButtonClass),r.disabled=!0)}function u(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){c(t,e,r),r.setCustomValidity("")})),a(t,r,n)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),e.removeEventListener("mousedown",s)}function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d),e.addEventListener("mousedown",s)}function s(e){e.target.closest(".popup__content")||i(e.target.closest(".popup"))}function d(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&null!==t&&i(t)}var p=document.querySelector("#card-template").content,f=document.querySelector(".popup__image"),_=document.querySelector(".popup_type_image"),m=document.querySelector(".popup__caption");function y(e,t,r,n,o){var c=p.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");c.querySelector(".card__title").textContent=e.name;var l=c.querySelector(".card__like-counter");return a.src=e.link,a.alt=e.name,l.textContent=e.likes.length,e.owner._id===o?u.addEventListener("click",(function(){t(e._id,c)})):u.classList.add("card__delete-button-hide"),e.likes.some((function(e){return e._id===o}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return r(e._id,i,l)})),a.addEventListener("click",(function(){return n(e)})),c}function v(e){f.alt=e.name,m.textContent=e.name,f.src=e.link,l(_)}function h(e,t,o){(t.classList.contains("card__like-button_is-active")?n:r)(e).then((function(e){t.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch(console.error)}function S(r,n){(function(r){return t("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers})})(r).then((function(){return n.remove()})).catch(console.error)}var b,q=document.forms["edit-profile"],E=document.forms["new-place"],g=(E["place-name"],E.link,document.forms.avatar),C=document.querySelector(".places__list"),L=document.querySelector(".popup_type_avatar"),k=document.querySelector(".popup_type_edit"),x=document.querySelector(".profile__edit-button"),A=(k.querySelector(".popup__close"),document.querySelectorAll(".popup__close")),w=document.querySelector(".profile__add-button"),U=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup__input_type_card-name"),j=document.querySelector(".popup__input_type_url"),O=L.querySelector(".popup__input_type_url"),B=document.querySelector(".profile__image"),P=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),I=q.elements.name,M=q.elements.description;function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var J=[t("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}),t("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers})];function V(e){e.textContent="Сохранение..."}function G(e){e.textContent="Сохранить"}Promise.all(J).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?N(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];P.textContent=o.name,D.textContent=o.about,B.style.backgroundImage="url(".concat(o.avatar,")"),b=o._id,c.forEach((function(e){C.append(y(e,S,h,v,b))}))})).catch(console.error),w.addEventListener("click",(function(){l(U),u(E,o)})),x.addEventListener("click",(function(){M.value=D.textContent,I.value=P.textContent,l(k),u(q,o)})),A.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){i(t)}))})),B.addEventListener("click",(function(){l(L),u(L,o)})),E.addEventListener("submit",(function(r){return r.preventDefault(),V(r.target.querySelector(".popup__button")),(n=T.value,o=j.value,t("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})})).then((function(e){C.prepend(y(e,S,h,v,b))})).catch(console.error).finally((function(){i(U),G(r.target.querySelector(".popup__button")),E.reset()}));var n,o})),g.addEventListener("submit",(function(r){return r.preventDefault(),V(r.target.querySelector(".popup__button")),(n=O.value,t("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})})).then((function(e){B.style.backgroundImage="url(".concat(e.avatar,")")})).catch(console.error).finally((function(){i(L),G(r.target.querySelector(".popup__button")),g.reset()}));var n})),q.addEventListener("submit",(function(r){return r.preventDefault(),V(r.target.querySelector(".popup__button")),(n=I.value,o=M.value,t("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})})).then((function(e){P.textContent=e.name,D.textContent=e.about})).catch(console.error).finally((function(){i(k),G(r.target.querySelector(".popup__button"))}));var n,o})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);a(e,r,n),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){r.validity.patternMismatch?r.setCustomValidity(r.dataset.errorMessage):r.setCustomValidity(""),r.validity.valid?c(e,t,r):function(e,t,r,n){var o=t.querySelector(".".concat(r.id,"-error"));r.classList.add(e.inputErrorClass),o.classList.add(e.errorClass),o.textContent=n}(e,t,r,r.validationMessage)}(e,t,o),a(e,r,n)}))}))}(e,t)}))}(o)})();