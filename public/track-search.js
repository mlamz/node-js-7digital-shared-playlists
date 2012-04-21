$(document).ready(function(){
	var playlistTrackIds = [], trackCurrentlyPlaying = false;



  now.receiveNewPlaylistTrack = function(name, track){
      console.log("receiving track...");
      console.log(track);
      playlistTrackIds.push(track.trackId);

      var trackHtml = buildSearchResultHtml(track.image, track.artistName, track.trackName, false, false, track.trackId, track.addedBy);
      console.log(trackHtml);
      $("#sortable").append(trackHtml);
      playNextTrack();
  }

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

 				$("#searchResults").append(buildSearchResultHtml(track.release.image, track.artist.name, track.title, isLast, isRepeatedTrack, track.id));
        
      })
      bindSearchResultTriggers();
 		})
	})

  function bindSearchResultTriggers(){
    var trackIdAdded, trackToPublish;

    $("#searchResults li.search-result").click(function() {
      var searchResult = $(this);
      trackIdAdded = searchResult.attr("data-trackid");
      


      if (trackIdAdded !== undefined && playlistTrackIds.indexOf(trackIdAdded) === -1){
        console.log("track added", trackIdAdded);

        trackToPublish = {
          trackId: trackIdAdded,
          trackName: searchResult.attr("data-trackname"),
          artistName: searchResult.attr("data-artistname"),
          image: searchResult.attr("data-image"),
          addedBy: now.name
        }

        now.distributeNewPlaylistTrack(trackToPublish);
      }
      console.log("tracks in playlist", playlistTrackIds);
      console.log("track to distribute", trackToPublish);

      
      
    })
  }
  function playNextTrack(){
    if (playlistTrackIds.length > 0 && !trackCurrentlyPlaying){
          playTrack(playlistTrackIds[0]);
      }
  }

  function playTrack(trackid){
    if (!trackCurrentlyPlaying){
      console.log("playing track id ", trackid);
      trackCurrentlyPlaying = true;
      var stream = "http://previews.7digital.com/clips/34/"+trackid+".clip.mp3";
      $('#audio-stream').attr('src', stream);
      var a = audiojs.createAll({
        trackEnded: function() {
          trackCurrentlyPlaying = false;
          console.log("track ended, removing trackid " + trackid);
          $("#sortable li.search-result[data-trackid="+ trackid +"]").remove();
          playlistTrackIds.shift();
          console.log("removed...", trackid);
          playNextTrack();
        }
     }); 
      document.getElementById('audio-stream').play();
    }
  }

  function buildSearchResultHtml(image, artist, track, isLast, isRepeatedTrack, trackId, addedBy){
    var html = "";
    artist = artist.length > 12 ? artist.substr(0, 12) + "..." : artist;
    track = track.length > 25 ? track.substr(0, 25) + "..." : track;
    addedBy = (addedBy !== undefined) ? "Added by " + addedBy : "";
    if(!isRepeatedTrack){
      html = "<li class='search-result ui-widget-content playlist-spot-container' data-trackid='"+trackId+"' data-image='"+ image +"' data-artistname='"+ artist +"' data-trackname='"+ track +"'>"
      +"<div class='column first'><img src='" + image + "' /></div>"
      +"<div class='column'><span class='small' style='font-size:10px'>"
      + artist
      + " - "
      + track
      + "</span>"
      + "<p>" + addedBy + "</p>"
      "</li>";
    }
    
    if (isLast){
      html += "</ul>";
    }
    
    return html;
  }
})

