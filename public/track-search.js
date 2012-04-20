$(document).ready(function(){
	var currentReleaseId, currentTrackId;

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
   				$("#searchResults").append(buildSearchResultHtml(track.release.image, track.artist.name, track.title, isLast, isRepeatedTrack, track.release.id, track.id));
          
        })

        	$(".search-result").draggable({ 
            revert: "invalid", 
            snap: "#shared-playlist", 
            snapMode: "inner", 
            snapTolerance: "100", 
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
              var trackid = getTrackId();
              playTrack(trackid);
              
      			}
		      });

          $( "#sortable" ).sortable({  
            revert: true, 
            cancel: ".ui-state-disabled", 
            //placeholder: "placeholder-highlight"  
          });

          $( "ul, li" ).disableSelection();
   		
   		function buildSearchResultHtml(image, artist, track, isLast, isRepeatedTrack, releaseId, trackId){
   			var html = "";

        if(!isRepeatedTrack){
          html = "<li class='search-result ui-widget-content playlist-spot-container' data-releaseid='"+releaseId+"' data-trackid='"+trackId+"'>"
          +"<div class='column first'><img src='" + image + "' /></div>"
          +"<div class='column'><span class='small' style='font-size:10px'>"
          + artist 
          + " - "
          + track 
          + "</span></li>";
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
      };
      var trackCurrentlyPlaying;
      function playTrack(trackid){
        
        if (!trackCurrentlyPlaying){

          trackCurrentlyPlaying = true;
          var stream = "http://previews.7digital.com/clips/34/"+trackid+".clip.mp3";
          $('#audio-stream').attr('src', stream);
          var a = audiojs.createAll({
            trackEnded: function() {
              console.log("track ended, removing trackid " + trackid);
              $("#sortable li.search-result[data-trackid="+ trackid +"]").remove();
                //trackCurrentlyPlaying = false;
                console.log("removed...")
                var trackid = playNextTrack();
                //if(trackid){
                //trackCurrentlyPlaying = true;
                }
            }
          );
         // $("#music-player").hide();  
        }
      }
           
        
      

      function getTrackId(){
        var trackid = $('#sortable').find('li.search-result[data-trackid]').attr("data-trackid");
        console.log(trackid);
        return trackid;
      }

 		})
	})
})

