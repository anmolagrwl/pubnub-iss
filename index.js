var getJSON = require('get-json')
var pubnub = require("pubnub")({
	subscribe_key: 'demo', // always required
	publish_key: 'demo'	// only required if publishing
});

function moveISS () {
    getJSON('http://api.open-notify.org/iss-now.json', function(error, response) {
        var lat = response['iss_position']['latitude'];
        var lon = response['iss_position']['longitude'];

        pubnub.publish({  //publishing the updated seat numbers through PubNub, in 'neo4j' channel
        	channel: "iss-pubnub",
        	message: {"latitude" : lat, "longitude" : lon}, //this is the message payload we are sending
					// message: {"geometry": {"type": "Point", "coordinates": [lat, lon]}, "type": "Feature", "properties": {}}, //this is the message payload we are sending
        	callback: function(m){console.log(m)}
      	});

    });
    setTimeout(moveISS, 3000);
}

moveISS();

// message: {"geometry": {"type": "Point", "coordinates": [lat, lon]}, "type": "Feature", "properties": {}}, //this is the message payload we are sending
