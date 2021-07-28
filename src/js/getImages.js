'use strict'
export const getImages = (requestName, page, limit) => {
   const baseUrl = `https://pixabay.com/api/?key=22644758-91a56f4647f302f87ea071930&q=${requestName}&page=${page}&per_page=${limit}&image_type=photo&orientation=horizontal&safesearch=true`;
   return fetch(baseUrl)
      .then(response => {
         return response.json();
      });
};

