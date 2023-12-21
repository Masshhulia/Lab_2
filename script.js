const API_KEY = 'api_key=82bf612c6aa37e26b14afffcfc3d5c3e';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

getMovies(API_URL);

function getMovies(url){
  try{
  fetch(url).then(res => res.json()).then(data =>{
    if (data.results && data.results.length > 0) {
      showMovies(data);
    }else{
      main.innerHTML = '<h2>No movies found. Please try another search.</h2>';
    }
  })}catch(error){
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const main = document.getElementById('main'); 

function showMovies(data) {
  
  main.innerHTML = '';

  data.results.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const img = document.createElement('img');
    img.src = `${IMG_URL}${poster_path || "/path-to-placeholder-image.jpg"}`;
    img.alt = title;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = title;

    const rating = document.createElement('span');
    rating.classList.add(getColor(vote_average));
    rating.textContent = vote_average;

    const overviewDiv = document.createElement('div');
    overviewDiv.classList.add('overview');
    overviewDiv.textContent = overview;

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(rating);
    movieDiv.appendChild(img);
    movieDiv.appendChild(movieInfo);
    movieDiv.appendChild(overviewDiv);

    main.appendChild(movieDiv);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

const form =  document.getElementById('form');
const search = document.getElementById('search');

function searchMovies(searchTerm) {
  const searchURL = `${BASE_URL}/search/movie?${API_KEY}&query=${searchTerm}`;

  getMovies(searchURL);
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    searchMovies(searchTerm);
  } else {
    const randomMoviesURL = `${BASE_URL}/discover/movie?${API_KEY}&sort_by=popularity.desc`;
    getMovies(randomMoviesURL);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  searchInput.focus();
});
const searchInput = document.getElementById('search');
const clearSearchIcon = document.getElementById('clear-search');

clearSearchIcon.addEventListener('click', () => {
    searchInput.value = ''; 
    clearSearchIcon.style.display = 'none';
    searchInput.focus();
});


searchInput.addEventListener('input', () => {
    if (searchInput.value === '') {
        clearSearchIcon.style.display = 'none'; 
    } else {
        clearSearchIcon.style.display = 'inline';
    }
});

