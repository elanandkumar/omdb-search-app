document.getElementById('search_btn').addEventListener('click', function(){
	var title = document.getElementById('title_text').value;
	var request = new Request('https://www.omdbapi.com/?apikey=4dd3fc90&s='+title);
	fetch(request).then(function(result){
		return result.json();
	}).then(function(data){
		var searchEl = document.getElementById('search_result');
		var len = data.Search.length;
		for(var i = 0; i < len; i++){
			var movieContainer = document.createElement('div');
			movieContainer.className = 'search-result--item';
			var titleEl = document.createElement('div');
			titleEl.innerText = data.Search[i].Title;
			var yearEl = document.createElement('div');
			yearEl.innerText = data.Search[i].Year;
			var typeEl = document.createElement('div');
			typeEl.innerText = data.Search[i].Type;
			var posterEl = document.createElement('img');
			posterEl.src = data.Search[i].Poster;
			movieContainer.appendChild(posterEl);
			movieContainer.appendChild(titleEl);
			movieContainer.appendChild(yearEl);
			movieContainer.appendChild(typeEl);
			searchEl.appendChild(movieContainer);
		}
	});
});