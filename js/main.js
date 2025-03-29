let loader, searchBtn, searchResult;

function toggleLoader(show) {
  loader.style.display = show ? "block" : "none";
  searchResult.style.display = show ? "none" : "inline-block";
}

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function doSearch(searchTerm) {
  const url = new Request(
    "https://www.omdbapi.com/?apikey=4dd3fc90&s=&" + searchTerm
  );

  return await fetchData(url);
}

function getMovieContainer(card) {
  const movieContainer = document.createElement("div");
  movieContainer.className = "search-result--item";
  const titleEl = document.createElement("div");
  titleEl.innerText = card.Title;
  const yearEl = document.createElement("div");
  yearEl.innerText = card.Year;
  const typeEl = document.createElement("div");
  typeEl.innerText = card.Type;
  const posterEl = document.createElement("img");
  posterEl.src = card.Poster;

  movieContainer.appendChild(posterEl);
  movieContainer.appendChild(titleEl);
  movieContainer.appendChild(yearEl);
  movieContainer.appendChild(typeEl);

  return movieContainer;
}

function renderCards(cards) {
  cards.forEach((card) => {
    const movieContainer = getMovieContainer(card);

    searchResult.appendChild(movieContainer);
  });
}

async function handleSearch() {
  searchResult.innerHTML = "";
  toggleLoader(true);
  const searchTerm = document.getElementById("title_text").value;
  try {
    const searchResponse = await doSearch(searchTerm);
    if (searchResponse.Response === "False") {
      searchResult.innerHTML = "Something went wrong!!!";
      toggleLoader(false);
    } else {
      var len = searchResponse?.Search?.length ?? 0;
      if (len) {
        renderCards(searchResponse.Search);
        toggleLoader(false);
      } else {
        searchResult.innerHTML = "No results found!!!";
        toggleLoader(false);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function init() {
  loader = document.getElementById("loader");
  searchBtn = document.getElementById("search_btn");
  searchResult = document.getElementById("search_result");
  searchBtn.onclick = handleSearch;

  toggleLoader(false);
}

init();
