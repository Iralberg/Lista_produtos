let total=document.getElementById('total')

let P = document.getElementById('produto');
let PC = document.getElementById('preco');
let res = document.getElementById('res');
let calc = document.getElementById('calc');
let listaFinal = document.getElementById('listaFinal');

let lista =[]

function adicionar() {
  if (P.value === '' || PC.value == 0) {
    alert('Error[ ], está faltando dados');
   
  } else {

    let nome= P.value
    let preco = Number(PC.value);

    let itemList={nome, preco}
    lista.push(itemList);

    let item = document.createElement('p');
    item.innerText = `Produto: ${P.value} | Preço: R$ ${preco.toFixed(2)}`;
    item.style.fontFamily = 'sans-serif';
    
    //pra ativar e desativar a div res
    if(res===''){
      res.style.background='rgb(45, 131, 153)'
    }else{
      res.style.display='block'
    }


    // Criar botão de deletar
    let botao = document.createElement("button");
    botao.innerText = "Deletar";
    botao.style.marginLeft = "10px";

    botao.onclick = function () {
      item.remove(); // remove o parágrafo

      // Remove a primeira ocorrência desse preço no array
      let i = lista.indexOf(itemList);
      if (i !== -1) {
        lista.splice(i, 1);
      }

     
    };
 

    item.appendChild(botao);
    res.appendChild(item);

    // Limpar inputs
    P.value = '';
    PC.value = '';
  }
}
function mostrarlista(){
  
 let ul=document.createElement('ul')
 listaFinal.innerHTML=`<h3> Lista Final </h3>`
 if(lista.length===0){
   res.style.display='none'
 }else
 {for(let item of lista){
  let li= document.createElement('li')
  li.innerHTML=`Produto: ${item.nome} | Preço: R$ ${item.preco}`
  ul.appendChild(li)
 }
 
 listaFinal.appendChild(ul)}
}

function soma() {
 if (lista.length === 0) {
    alert('Error[ ], está faltando dados');
    calc.innerHTML = ''
     res.style.display='none'
  } else {
    let total = lista.reduce((soma, item) => soma + item.preco, 0);
    calc.innerHTML = `Total: R$ ${total.toFixed(2)}`;
  }
}

function gerarPDF() {
      const div = document.getElementById('total');

      html2pdf()
        .set({
          margin:30,
          filename: 'ListaBerg.pdf',
          jsPDF: { format: 'a4', orientation: 'portrait' }
        })
        .from(div)
        .save();
}


