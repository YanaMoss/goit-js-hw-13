'use strict'

import './sass/main.scss';
import { getImages } from './js/getImages';
import card from'./templates/card.hbs';
import _, { divide } from 'lodash';
import Notiflix from 'notiflix'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;
const limit = 100;
const searchQuery = document.querySelector('input');
const searchButton = document.querySelector('button')
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let page = 1;
let dataImages = [];
let requestName = ' ';
let name = ' ';
let totalHits = ' 1';
window.onload = () => {
   // !!Добавляю атрибут value in input
   searchQuery.addEventListener('input', _.debounce(getSearchQuery, DEBOUNCE_DELAY));
   function getSearchQuery(event) {
      if (event.target.value.trim() !== '') {
         name = event.target.value;
         searchQuery.setAttribute('value', name);
         searchButton.removeAttribute("disabled");
         dataImages = [];
      };
   };

   searchButton.addEventListener('click', sendSearchQuery);

   function sendSearchQuery(event) {
      event.preventDefault();
      renderImage();
      searchButton.setAttribute("disabled", "disabled");
      Notiflix.Notify.Info(`'Hooray! We found ${response.totalHits} images.'`);
      
   
   };

   loadMoreButton.addEventListener('click', getLoadMore);

   function getLoadMore(event) {
      event.preventDefault();
      if (dataImages.length >= totalHits) {
         Notiflix.Notify.Failure("We're sorry, but you've reached the end of search results.")
      } else {
         page += 1;
         renderImage();
      }
   };

   function renderImage() {
      if (name !== requestName) {
         dataImages = [ ];
      }
      requestName = searchQuery.getAttribute('value');
      getImages(requestName, page, limit)
         .then((response) => {
            if (response.hits.length === 0) {
               throw new Error('Sorry, there are no images matching your search query. Please try again.');
            }
            loadMoreButton.classList.remove('is-hidden');
            dataImages.push(...response.hits)
            totalHits = response.totalHits;
            gallery.innerHTML = card(dataImages);
         })
         .catch((err) => {
            Notiflix.Notify.Failure(err.message)
            loadMoreButton.classList.add('is-hidden')
         });
   
   };
};