'use strict'

import './sass/main.scss';
import { getImages } from './js/getImages';
import card from'./templates/card.hbs';
import _, { divide } from 'lodash';
import Notiflix from 'notiflix'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;
let page = 1;
const limit = 4;
const searchQuery = document.querySelector('input');
const searchButton = document.querySelector('button')
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let dataImages = [];
let requestName = ' ';
let name = ' ';
window.onload = () => {
   // !!Добавляю атрибут value in input
   searchQuery.addEventListener('input', _.debounce(getSearchQuery, DEBOUNCE_DELAY));
   function getSearchQuery(event) {
      if (event.target.value.trim() !== '') {
         name = event.target.value;
         searchQuery.setAttribute('value', name);
      };
   };

   searchButton.addEventListener('click', sendSearchQuery);

   function sendSearchQuery(event) {
      event.preventDefault();
      renderImage();
   
   };

   loadMoreButton.addEventListener('click', getLoadMore);

   function getLoadMore(event) {
      event.preventDefault();
      page += 1;
      console.log(page);
      console.log(requestName);
      console.log(limit);
      renderImage();
      if (dataImages.length === response.totalHits) {
         Notiflix.Notify.Info("We're sorry, but you've reached the end of search results.");
      } else if (dataImages.length >= response.totalHits){
         loadMoreButton.classList.add(".to-hidden");
      };
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
            dataImages.push(...response.hits)
            gallery.innerHTML = card(dataImages);
            console.log(dataImages)
            console.log(response);
         })
         .catch((err) => {
            Notiflix.Notify.Failure(err.message)
         });
   
   };
};