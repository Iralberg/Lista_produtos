let total = document.getElementById('total');

let P = document.getElementById('produto');
let PC = document.getElementById('preco');
let res = document.getElementById('res');
let calc = document.getElementById('calc');
let listaFinal = document.getElementById('listaFinal');

let lista = [];

// ------------------ ADICIONAR ITEM ------------------ //
function adicionar() {
  if (P.value === '' || PC.value == 0) {
    alert('Error[ ], está faltando dados');
  } else {
    let nome = P.value;
    let preco = Number(PC.value);

    let itemList = { nome: nome, preco: preco };
    lista.push(itemList);

    mostraLista(); // Mostra tudo novamente
    salvarLocal();
  }
}

// ------------------ MOSTRAR LISTA NA TELA ------------------ //
function mostraLista() {
  res.innerHTML = ''; // limpa antes de mostrar

  if (lista.length === 0) {
    res.style.display = 'none';
    return;
  }

  res.style.display = 'block';

  lista.forEach((itemList, index) => {
    let item = document.createElement('p');
    item.innerText = `Produto: ${itemList.nome} | Preço: R$ ${itemList.preco.toLocaleString('pt-br',
            {
               style:'currency', currency:'BRL' 
            })}`;
    item.style.fontFamily = 'sans-serif';

    // botão deletar
    let botao = document.createElement("button");
    botao.innerText = "Deletar";
    botao.style.marginLeft = "10px";

    botao.onclick = function () {
      lista.splice(index, 1); // remove item correto
      mostraLista();          // atualiza a lista na tela
      salvarLocal();          // atualiza localStorage
    };

    item.appendChild(botao);
    res.appendChild(item);
  });

  // limpar inputs
  P.value = '';
  PC.value = '';
}

// ------------------ LISTA FINAL ------------------ //
function mostrarlistaFinal() {
  listaFinal.innerHTML = `<h3> Lista Final </h3>`;
  let ul = document.createElement('ul');

  lista.forEach(item => {
    let li = document.createElement('li');
    li.innerHTML = `Produto: ${item.nome} | Preço: R$ ${item.preco.toFixed(2)}`;
    ul.appendChild(li);
  });

  listaFinal.appendChild(ul);
}

// ------------------ SOMAR ------------------ //
function soma() {
  if (lista.length === 0) {
    alert('Error[ ], está faltando dados');
    calc.innerHTML = '';
    return;
  }

  let total = lista.reduce((soma, item) => soma + item.preco, 0);
  calc.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

// ------------------ SALVAR LOCALSTORAGE ------------------ //
function salvarLocal() {
  localStorage.setItem('lista2', JSON.stringify(lista));
}

// ------------------ RECARREGAR AO ABRIR ------------------ //
function recarregar() {
  const salva = localStorage.getItem('lista2');
  if (salva) {
    lista = JSON.parse(salva);
    mostraLista();
  }
}

recarregar();

// ------------------ PDF ------------------ //
function gerarPDF() {
  const div = document.getElementById('total');

  html2pdf()
    .set({
      margin: 30,
      filename: 'ListaBerg.pdf',
      jsPDF: { format: 'a4', orientation: 'portrait' }
    })
    .from(div)
    .save();
}
