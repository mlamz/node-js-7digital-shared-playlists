$(document).ready(function(){
	$("#track-search").submit(function(e){
		e.preventDefault();
		queryParams = { query : $("#track-search-query").val() };
		$.post("/trackSearch", queryParams,	function(data) {
   			data = JSON.parse(data);
   			$("#searchResults").text('');
     		$.each(data.response.searchResults.searchResult, function(index, searchResult){
     			var track = searchResult.track;
     			if ($("#searchResults").text().indexOf(track.title) === -1){
     				$("#searchResults").append(buildSearchResultHtml(track.release.image, track.artist.name, track.title));
     			}
     			
        	})
   		
   		function buildSearchResultHtml(image, artist, track){
   			return "<div class='search-result'><div class='column first'><img src='" + image + "' /></div><div class='column'><span class='small' style='font-size:10px'>"+ artist + " - "+ track + "</span></div>";
   		}

   		})
	})
})

