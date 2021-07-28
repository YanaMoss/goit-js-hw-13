'use strict'

import './sass/main.scss';
import { getImages } from './js/getImages';
import card from'./templates/card.hbs';
import _, { divide } from 'lodash';
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;
let dataImages = {};
let page = 1;
const limit = 40;
const searchQuery = document.querySelector('input');
const searchButton = document.querySelector('button')
const gallery = document.querySelector('.gallery');

searchQuery.addEventListener('input', _.debounce(getSearchQuery, DEBOUNCE_DELAY));
searchButton.addEventListener('click', sendSearchQuery)

function getSearchQuery(event) {
   let name = event.target.value;
   searchQuery.setAttribute('value', name);   
}

function sendSearchQuery() {
   let requestName = searchQuery.getAttribute('value');
   console.log(requestName);
   console.log(page);
   console.log(limit);
   getImages(requestName, page, limit)
      .then((response) => {
         dataImages = response.hits;
         console.log(dataImages);
         renderImages(dataImages);
      })
      .catch((err) => {
      console.log('OOOOOOOOOOO')
   })
};

function renderImages (dataImages) {
   gallery.innerHTML = card(dataImages);
   
}
   