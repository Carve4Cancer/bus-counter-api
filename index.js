var request = require('request');
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var product_id = event.product_id
    var options = {
        url: 'https://api.trycelery.com/v2/orders?line_items.product_id='+product_id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.auth_code
        }
    };
 
    function request_callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var total = 0
            var object = JSON.parse(body);
            for(var i = 0; i < object.data.length; i++) {
              var number = object.data[i].line_items[0].quantity
              number ? total += Number(number) : 0
            } 
            callback(null, total)
        }
    }
    request(options, request_callback);
};


