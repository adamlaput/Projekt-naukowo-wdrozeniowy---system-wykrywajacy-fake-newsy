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
        var text = document.getElementById("article").value;
        var query = "?text=";
        var f = d.createElement('form');
        var url = 'https://fakenews-pnw-app.herokuapp.com/predict';
        var url = url.concat(query,text)
        
        const Http = new XMLHttpRequest();
        Http.open("PUT", url);
        Http.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        Http.setRequestHeader('Access-Control-Allow-Origin', '*');
        Http.send();
        var response = "";
        Http.onreadystatechange = (e) => {
          console.log(Http.responseText)
          response = Http.responseText;
        }

        //fetch(url)
        //.then(response => response.json())
        //.then(data => console.log(data));
        //console.log(response)
        //response = { "prediction": "0.9"}
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