var request = require('request'),
	parser = require('xml2json');

module.exports = 
{
    index : function index(req, res){
        var searchQuery = req.body.query, 
        trackSearchEndpoint = "http://api.7digital.com/1.2/track/search/?q=" + searchQuery + "&oauth_consumer_key=YOUR_KEY_HERE";

        request(trackSearchEndpoint, function (error, response, body) {
	  		var parsedBody, json;
	  		if (!error && response.statusCode == 200) {
				json = parser.toJson(body);
		    	res.send(json);
		    }
	  	})
    }
}