$(document).ready(function(){
	var playlistTrackIds = [], trackCurrentlyPlaying = false;

  now.ready(function(){
    syncPlaylistTracks();
    playNextTrack();

    now.receiveNewPlaylistTrack = function(name, track){
        var trackHtml = buildSearchResultHtml(track.image, track.artistName, track.trackName, false, false, track.trackId, track.addedBy);
        $("#sortable").append(trackHtml);
        playlistTrackIds.push(track.trackId);
        playNextTrack();
    }

    now.receiveRemovalOfPlaylistTrack = function(name, trackid){
      console.log("track ended, removing trackid " + trackid);
      $("#sortable li.search-result[data-trackid="+ trackid +"]").remove();
      playlistTrackIds.shift();
      console.log("removed...", trackid);
      playNextTrack();
    }

  	$("#track-search").submit(function(e){
  		e.preventDefault();
  		$.post("/trackSearch", { query : $("#track-search-query").val() }, function(data) {
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

      $("#searchResults li.search-result").hover(function(){ 
        $(this).addClass("search-result-hover");
      }, function() {
        $(this).removeClass("search-result-hover");
      });

      $("#searchResults li.search-result").click(function() {
        var searchResult = $(this);
        trackIdAdded = searchResult.attr("data-trackid");

        if (trackIdAdded !== undefined && playlistTrackIds.indexOf(trackIdAdded) === -1){
          trackToPublish = {
            trackId: trackIdAdded,
            trackName: searchResult.attr("data-trackname"),
            artistName: searchResult.attr("data-artistname"),
            image: searchResult.attr("data-image"),
            addedBy: now.name
          }
          now.distributeNewPlaylistTrack(trackToPublish);
        }        
      })
    }

    function playNextTrack(){
      if (playlistTrackIds.length > 0 && !trackCurrentlyPlaying){
            playTrack(playlistTrackIds[0]);
        }
    }

    function playTrack(trackid){
      var stream = "http://previews.7digital.com/clips/34/"+trackid+".clip.mp3";
      if (!trackCurrentlyPlaying){
        trackCurrentlyPlaying = true;
        $('#audio-stream').attr('src', stream);
        audiojs.createAll({
          trackEnded: function() {
            trackCurrentlyPlaying = false;
            now.distributeRemovalOfFinishedTrack(trackid);
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
        html = "<li class='search-result playlist-spot-container' data-trackid='"+ trackId
        +"' data-image='"+ image 
        +"' data-artistname='"+ artist 
        +"' data-trackname='"+ track +"'>"
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

    function syncPlaylistTracks() {
      $("#sortable li.search-result").each(function(){
        var trackIdToSync = $(this).attr('data-trackid');
        playlistTrackIds.push(trackIdToSync);
      });
    }

  })
})

