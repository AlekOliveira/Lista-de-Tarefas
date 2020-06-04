let buttonElement = document.querySelector('#app button');
let listElement  = document.querySelector("#app ol");
let inputElement = document.querySelector("#app input");


//recupera o JSON e  os converte novamente em array, caso o JSON não contenha dados um array vazio será o default
let tarefas = JSON.parse(localStorage.getItem('list_tarefas') || []);

function renderizaTarefas(){
    listElement.innerHTML = ''; //remove os itens anteriores presentes dentro da tag
    for (const texto of tarefas) {
        let newTarefa = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.setAttribute('href', '#');

        let newLinkText = document.createTextNode(' Excluir');
        let newTarefaText = document.createTextNode(texto);

        //cria uma tag de link com a chamada da remoção informando a posição no array caso receba um clique. 
        let pos = tarefas.indexOf(texto);
        newLink.setAttribute('onclick', 'removeTarefa('+pos+')');

        newLink.appendChild(newLinkText);
        newTarefa.appendChild(newTarefaText);
        newTarefa.appendChild(newLink);

        listElement.appendChild(newTarefa);
    }
}

renderizaTarefas();

function addTarefa(){    
    tarefas.push(inputElement.value);
    inputElement.value = "";
    renderizaTarefas();
    salvarLocalmente();
}
buttonElement.onclick = addTarefa;

function removeTarefa(pos)
{
    tarefas.splice(pos,1);
    renderizaTarefas();
    salvarLocalmente();
}

function salvarLocalmente()
{
    localStorage.setItem('list_tarefas', JSON.stringify(tarefas));
}

