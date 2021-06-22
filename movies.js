const resDiv = document.querySelector('#results');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const totalPages = document.querySelector('#total');
const pageDisplay = document.querySelector('#page');
const searchForm = document.querySelector('#search');
const searchQuery = document.querySelector('#query');
const openOverlay = document.querySelectorAll('#open');
const overlay = document.querySelector('.Overlay');
const closeBtn = document.querySelector('#closeOverlay');
const infoDiv = document.querySelector('.info');

let current_page = 1;
pageDisplay.innerHTML = current_page;

nextBtn.addEventListener('click', () => {
  current_page++;
  pageDisplay.innerHTML = current_page;
  getMovies();
});

prevBtn.addEventListener('click', () => {
  current_page--;
  pageDisplay.innerHTML = current_page;

  if (current_page < 1) {
    current_page = 1;
    alert("You already on page 1");
    pageDisplay.innerHTML = current_page;
  }

  getMovies();
})



window.onload = () => {
  getMovies();
}



window.addEventListener('online', () => {
  getMovies();
});

window.addEventListener('offline', () => {
  resDiv.innerHTML = "No internet connection, check your wifi or cable and try again";
});



searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pagination = document.querySelector('#pagination');

  const searchHeading = document.querySelector('#searchHeading');
  const movieTerm = searchQuery.value;

  if (movieTerm !== "") {

    searchMovie(movieTerm);
    searchHeading.style.display = "block";
    searchHeading.innerHTML = `Searching For: <span>${movieTerm}</span>`;

  } else {
    alert('Enter any keyword..');
    return false;
  }

  pagination.style.display = "none";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";

});



const searchMovie = (movie) => {

  fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movie}`)
    .then(response => {
      return response.json();
    })
    .then(movieData => {
      const movieObj = movieData.data;
      let Output = '';
      let total = Math.round(movieObj.movie_count / movieObj.limit);
      totalPages.innerHTML = total;
      if (movieObj.movie_count !== 0) {

        movieObj.movies.forEach(movieInfo => {
          Output += `
          <div class="movie">
            <h2 class="movie-title" title="${movieInfo.title}">${movieInfo.title_english}</h2>
            <img src="${movieInfo.medium_cover_image}" alt="${movieInfo.title}">
            <input type="hidden" value="${movieInfo.id}">
            <div>
            <button id="open" class="open">Download Movie </button>
            </div>
          </div>
        `;
        });

        document.querySelector('#errors').innerHTML = "";

      } else {
        document.querySelector('#errors').innerHTML = `<h1>No movie Found: ${movie}</h1>`;

      }


      resDiv.innerHTML = Output;


    })
    .catch(error => {
      console.log(`There is an Error: ${error}`);
    });

}

const getMovies = () => {

  fetch(`https://yts.mx/api/v2/list_movies.json?page=${current_page}`)
    .then(response => {
      return response.json();
    })
    .then(movieData => {
      const movieObj = movieData.data;
      let Output = '';

      let total = Math.round(movieObj.movie_count / movieObj.limit);
      totalPages.innerHTML = total;

      movieObj.movies.forEach(movieInfo => {
        Output += `
          <div class="movie">
            <h2 class="movie-title" title="${movieInfo.title}">${movieInfo.title_english}</h2>
            <img src="${movieInfo.medium_cover_image}" alt="${movieInfo.title}">
            <input type="hidden" value="${movieInfo.id}">
            <div>
            <button id="open" class="open">Download Movie </button>
            </div>
          </div>
         
        `;
      });
      resDiv.innerHTML = Output;


    })
    .catch(error => {
      console.log(`There is an Error: ${error}`);
    });


}




closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  document.body.setAttribute('style', 'overflow:auto');
});



resDiv.addEventListener('click', (e) => {

  if (e.target.className == "open") {
    const movieID = e.target.parentElement.parentElement.children[2].value;
    document.body.setAttribute('style', 'overflow:hidden');
    overlay.style.display = 'block';

    getMovieById(movieID);
  }

});

const getMovieById = (id) => {

  fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    .then(response => {
      return response.json();
    })
    .then(movieData => {
      const movieObj = movieData.data.movie;
      let Output = '';


      Output += `

          <div class="movie-thumbnail">
            <img src="${movieObj.medium_cover_image}" alt="${movieObj.title}">
            <li> <a href="https://www.imdb.com/title/${movieObj.imdb_code}">IMDB :${movieObj.rating}/10</h1></div></a></li> 

          <div class="movie-details">
            <h1 title="${movieObj.title}">${movieObj.title_english}</h1> 
            <p>${movieObj.description_full}</p>

            <ul>
            ${movieObj.torrents.map(torrent => `
            <li> Magent: <a href="magnet:?xt=urn:btih:${torrent.hash}&dn=${movieObj.title_english}&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker2.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2F%5B2001%3A67c%3A28f8%3A92%3A%3A1111%3A1%5D%3A2710&tr=udp%3A%2F%2Fbt.xxx-tracker.com%3A2710&tr=udp%3A%2F%2Fipv6.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089&tr=udp%3A%2F%2Ftracker.grepler.com%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969"
                                    ">Magnet</a></li>
            <li>Download: <a href="${torrent.url}">${torrent.url}</a></li>
            <li>Quality: ${torrent.quality} | Type: ${torrent.type} | Size: ${torrent.size} | Seeds: ${torrent.seeds} | Peers: ${torrent.peers}</li>
            <hr>

            `).join('')}
            </ul>

            <h2>Movie Trailer</h2>
            <div class="trailer">
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieObj.yt_trailer_code}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        
        `;


      infoDiv.innerHTML = Output;


    })
    .catch(error => {
      console.log(`There is an Error: ${error}`);
    });


}











