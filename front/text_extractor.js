
function text_extractor() {
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