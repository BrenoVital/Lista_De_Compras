function setConfig() {
  var texts = {
    "title": "Lista de compras"
  };
  document.title = texts.title;
  document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();
