import {formElement, formValid} from './form-processing.js';
import {sendData} from './api.js';

let mainNav = document.querySelector('.main-nav');

mainNav.classList.add('main-nav--close');
mainNav.classList.remove('main-nav--nojs');

mainNav.addEventListener('click', function() {
  if(mainNav.classList.contains('main-nav--close')) {
    mainNav.classList.remove('main-nav--close');
    mainNav.classList.add('main-nav--open');
  } else {
    mainNav.classList.remove('main-nav--open');
    mainNav.classList.add('main-nav--close');
  }
});


const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  //eslint-disable-next-line
  console.log('sending data', formData, formValid);

  if(formValid) {
    sendData(formData);
  }
};

formElement.addEventListener('submit', onFormElementSubmit);
