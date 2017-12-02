#bus-counter-api
This api allows public access through our marketing page to the trycelery api for the purposes of displaying bus counter information to the website visitor. It does so by privately calling the trycelery api through the public front end with the following process:  
*square_space page* -> *public api* -> *private api*  

The private api returns the number of items purchased which are displayed in the square space page.  

##HTML, CSS, and Javascript for squarespace pages
The HTML that is embedded in the squarespace page is as  
###HTML
```
<div id="order_{product_id}" class="custom_order"></div>
```

###Javascript  
####Page Header Code Injection
'''
<style>
  .custom_order {
    padding: 0;
    margin: 0;
    position: relative;
    left: 35px;
    bottom: 25px;
    font-style: italic;
  }
</style>
<script>
  var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
</script>
'''

####Individual Page Javascript
'''
<script> 
var client = new HttpClient();
client.get('https://djakir7ha5.execute-api.us-east-2.amazonaws.com/Production/count?product_id={product_id}', function(response) {
    document.getElementById("order_{product_id}").innerHTML = response + ' riders so far!';
});
</script>
'''

