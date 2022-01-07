function text_extractor() {
    var bodyScripts = document.querySelectorAll("body script");
    for(var i=0; i<bodyScripts.length; i++){
        bodyScripts[i].remove();
    }
    var str = document.body.textContent;
    return str;
  }