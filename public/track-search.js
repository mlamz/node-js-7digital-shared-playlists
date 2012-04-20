$(document).ready(function(){
	

	$("#track-search").submit(function(e){
		e.preventDefault();
		queryParams = { query : $("#track-search-query").val() };
		$.post("/trackSearch", queryParams,	function(data) {
   			data = JSON.parse(data);
   			$("#searchResults").text('');
   			$("#searchResults").append('<ul>');
     		$.each(data.response.searchResults.searchResult, function(index, searchResult){
     			var track = searchResult.track,
                isLast = (index + 1 == data.response.searchResults.searchResult.length),
                isRepeatedTrack = $("#searchResults").text().indexOf(track.title) !== -1;
   				$("#searchResults").append(buildSearchResultHtml(track.release.image, track.artist.name, track.title, isLast, isRepeatedTrack));
          
        })

        	$(".search-result").draggable({ 
            revert: "invalid", 
            snap: "#shared-playlist", 
            snapMode: "inner", 
            snapTolerance: "200", 
            connectToSortable: "#sortable",
            helper: "clone",
          });

          $("playlist-spot-container").draggable({ 
            snap: true,
          });

        	$("#shared-playlist").droppable({
      			activeClass: "shared-playlist-hover",
      			hoverClass: "shared-playlist-active",
      			drop: function( event, ui ) {
              reorderPlayList();
      			}
		      });

          $( "#sortable" ).sortable({  
            revert: true, 
            cancel: ".ui-state-disabled", 
            //placeholder: "placeholder-highlight"  
          });

          $( "ul, li" ).disableSelection();
   		
   		function buildSearchResultHtml(image, artist, track, isLast, isRepeatedTrack){
   			var html = "";

        console.log(track, "is last" + isLast, "is repeat" + isRepeatedTrack);

        if(!isRepeatedTrack){
          html = "<li class='search-result ui-widget-content playlist-spot-container'><div class='column first'><img src='" + image + "' /></div><div class='column'><span class='small' style='font-size:10px'>"+ artist + " - "+ track + "</span></li>";
        }
        if (isLast){
          html += "</ul>";
        }
        return html;
   		}

      function reorderPlayList(){
          $("li.playlist-spot").remove();
          $("ul#sortable").append('<li class="playlist-spot ui-state-disabled"></li>');
          $("ul#sortable").append('<li class="playlist-spot ui-state-disabled"></li>');
          $("ul#sortable").append('<li class="playlist-spot ui-state-disabled"></li>');
          $("ul#sortable").append('<li class="playlist-spot ui-state-disabled"></li>');
          console.log();
      };

 		})
	})
})

