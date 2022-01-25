document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
        
        var f = d.createElement('form');

        var url = 'https://fakenews-pnw-app.herokuapp.com/predict';
        const text = document.getElementById("article").value;       
        var query = "text=";
        query = query.concat(text);
        url = url.concat("?", query);
        console.log(url);
        var response = "";
        
        const Http = new XMLHttpRequest();
        Http.open("PUT", url, true);
        Http.setRequestHeader('Content-type' ,'application/x-www-form-urlencoded');
        Http.setRequestHeader('Access-Control-Allow-Origin', '*');

        Http.onreadystatechange = (e) => {
          console.log(Http.responseText)
        }
        
        Http.onload  = function() {
          response = Http.response;
          const myObj = JSON.parse(response);
          var x = myObj["prediction"];
          var fake_news_probablility = 1 - x;
          fake_news_probablility=fake_news_probablility.toFixed(2);
          var pred = "Fake news probablility: ";
          pred = pred.concat(fake_news_probablility);
          var element = document.getElementById("probability");
          element.textContent = pred;
          
       };
        Http.send(query);
        
      });
    }, false);
  }, false);