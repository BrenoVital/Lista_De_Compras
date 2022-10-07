var lista = [];

function getValorTotal(lista) {
  var total = 0;
  for (var key in lista) {
    total += lista[key].valor * lista[key].quantidade;
  }
  document.getElementById("valorTotal").innerHTML = formatoValor(total);
}

function setLista(lista) {
  var tabela = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead>';
  for (var key in lista) {
    tabela += '<tr><td>' + formataDescript(lista[key].descript) + '</td><td>' + lista[key].quantidade + '</td><td>' + formatoValor(lista[key].valor) + '</td><td><button class="btn btn-default" onclick= "setAtt(' + key + ');" >Editar</button>  <button class="btn btn-default" onclick= "deleteAtt(' + key + ');" >Excluir</button> </td>';
  }
  tabela += '</tbody>';
  document.getElementById('listaTab').innerHTML = tabela;
  getValorTotal(lista);
  salvaLista(lista);
}

function formataDescript(descript) {
  var str = descript.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function formatoValor(valor) {
  var str = parseFloat(valor).toFixed(2) + "";
  str = str.replace(".", ",");
  str = "R$ " + str;
  return str;
}

function adicionaDados() {
  if (!erro()) {
    return;
  }

  var descript = document.getElementById("descript").value;
  var quantidade = document.getElementById("quantidade").value;
  var valor = document.getElementById("valor").value;

  lista.unshift({
    "descript": descript,
    "quantidade": quantidade,
    "valor": valor
  });
  setLista(lista);
}

function setAtt(id) {
  var obj = lista[id];
  document.getElementById('descript').value = obj.descript;
  document.getElementById('quantidade').value = obj.quantidade;
  document.getElementById('valor').value = obj.valor;
  document.getElementById('Attbotao').style.display = "inline-block";
  document.getElementById('Addbotao').style.display = "none";

  document.getElementById('idEntradaAtt').innerHTML = '<input id="idAtt" type="hidden" value="' + id + '">';
}

function botaoCancelar() {
  document.getElementById('descript').value = "";
  document.getElementById('quantidade').value = "";
  document.getElementById('valor').value = "";
  document.getElementById('Attbotao').style.display = "none";
  document.getElementById('Addbotao').style.display = "inline-block";
  document.getElementById('idEntradaAtt').innerHTML = "";
}

function botaoSalvar() {

  var id = document.getElementById('idAtt').value;
  var descript = document.getElementById("descript").value;
  var quantidade = document.getElementById("quantidade").value;
  var valor = document.getElementById("valor").value;

  lista[id] = {
    "descript": descript,
    "quantidade": quantidade,
    "valor": valor
  };
  botaoCancelar();
  setLista(lista);
}

function deleteAtt(id) {
  if (confirm("Deseja apagar o arquivo ?")) {
    if (id === lista.length - 1) {
      lista.pop();
    } else if (id === 0) {
      lista.shift();
    } else {
      var listainicio = lista.slice(0, id);
      var listafim = lista.slice(id + 1, lista.length);
      lista = listainicio.concat(listafim);
    }
    setLista(lista);
  }
}

function erro() {
  var descript = document.getElementById("descript").value;
  var quantidade = document.getElementById("quantidade").value;
  var valor = document.getElementById("valor").value;
  var erros = "";
  document.getElementById("erros").style.display = "none";
  if (descript === "") {
    erros += 'Preencha o campo de descrição!\n';
  }
  if (quantidade === "") {
    erros += 'Preencha o campo de quantidades!\n';
  } else if (quantidade != parseInt(quantidade)) {
    erros += 'O campo de quantidade deve ser um números inteiros!\n';
  }
  if (valor === "") {
    erros += 'Preencha o campo de valores!\n';
  } else if (valor != parseFloat(valor)) {
    erros += 'O campo de valores deve possuir números!';
  }

  if (erros !== "") {
    alert(erros);
    botaoCancelar();
    return 0;
  } else {
    return 1;
  }
}

function delelaLista() {
  if (confirm('Deseja mesmo apagar esta lista ?')) {
    list = [];
    setLista();
  }
}

function salvaLista(lista) {
  var jsonstr = JSON.stringify(lista);
  localStorage.setItem("lista", jsonstr);
}

function attLista() {
  var testalista = localStorage.getItem("lista");
  if (testalista) {
    lista = JSON.parse(testalista);
  }
  setLista(lista);
}

attLista();
