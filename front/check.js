function text_extractor(document) {
  var bodyScripts = document.querySelectorAll("body script");
  for(var i=0; i<bodyScripts.length; i++){
      bodyScripts[i].remove();
  }
  var str = document.body.textContent;
  //str = str.replace(/\s/g, "");
  str = str.replace(/(\r\n|\n|\r)/gm, "");
  str = str.replace(/\s\s+/g, ' ');
  //document.body.innerHTML = '<pre>'+str+'</pre>'; //do testow - odkomentowac
  return str;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
        
        //var text = text_extractor();
        var f = d.createElement('form');

        var url = 'https://fakenews-pnw-app.herokuapp.com/predict';
        var text = document.getElementById("article").value;       
        var query = "text=";
        query = query.concat(text);
        url = url.concat("?", query);
        console.log(url);
        //const Http = new XMLHttpRequest();
        //Http.open("PUT", url, true);
        //Http.setRequestHeader('Content-type' ,'application/json');
        //Http.setRequestHeader('Access-Control-Allow-Origin', '*');
         
        var response = "resp";
        //function hand () {
         // console.log(this.getResponseHeader('content-type'));
        //}
        //Http.onreadystatechange = hand;
        //Http.onreadystatechange = (e) => {
          //console.log("siema")
          //console.log(Http.responseText)
          //response = Http.responseText;
        //}
        //Http.send(query); 
        //fetch(url)
        //.then(response => response.json())
        //.then(data => console.log(data));
        //console.log(response)

        fetch(url, {method: 'PUT', mode: 'cors'})
          .then(response => response.text())
        const myObj = JSON.parse(response);
        var x = myObj["prediction"];
        console.log(x);
        var fake_news_probablility = 1 - x;
        console.log(fake_news_probablility);
        fake_news_probablility=fake_news_probablility.toFixed(2);
        console.log(fake_news_probablility);
        var element = document.getElementById("probability");
        //var element = document.querySelector("probability")
        element.textContent = fake_news_probablility
        
        
      });
    }, false);
  }, false);