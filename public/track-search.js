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
              console.log(event.srcElement);
              playTrack(1654269, 18100655);
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

        console.log(track, "is last" + isLast, "is repeat" + isRepeatedTrack);

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

      function playTrack(releaseid, trackid){
        if ($("#music-player").html() == ''){

         

        //var stream = "http://stream.geo.7digital.com/media/track/stream?releaseId=1355281&trackId=14973142&userId=0&country=GB&oauth_consumer_key=7dymqpkpnh9a&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1334932090&oauth_nonce=VdrguYG8y5pp2BQlCyDFYNMCU05s6ipgqW40P3GYN8E&oauth_version=1.0&oauth_signature=rwNCYFVjH54y3aGYCmT7LgVX%2FUQ%3D";
        var stream = "http://stream.geo.7digital.com/media/track/stream?formatid=26&oauth_consumer_key=7digital.com&oauth_nonce=1785104161&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1334937170&releaseid="+releaseid+"&trackid="+trackid+"&userid=3918918&oauth_signature=UZATvlezdsnOvsm4vETdC2th9WE%3D"
       // $("#music-player").append('<embed height="50px" width="100px" src="' + stream + '"></embed>');
        //$("#music-player").append('<audio><source src="http://stream.geo.7digital.com/media/track/stream?releaseId=1355281&trackId=14973142&userId=0&country=GB&oauth_consumer_key=7dymqpkpnh9a&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1334932090&oauth_nonce=VdrguYG8y5pp2BQlCyDFYNMCU05s6ipgqW40P3GYN8E&oauth_version=1.0&oauth_signature=rwNCYFVjH54y3aGYCmT7LgVX%2FUQ%3D" type="audio/mp3" /></audio>');
            $("#music-player").append('<audio width="50px" autoplay="autoplay" src="' + stream + '" controls preload="auto" autobuffer></audio>');
            $("#music-player").hide();
           // $("#music-player").append('<audio src="'+stream+'" preload="auto" />');
        }
      }

 		})
	})
})

