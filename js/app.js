/*  Lista de tarefas
/
/ Cria um elemento <li> dentro de uma tabela HTML quando o botão "Adicionar tarefa" ou enter
/ são pressionados.
/
/ Quando criado o valor de innerText de cada <li> é salvo em localSotarageque mantem as
/ tarefas criadas salvas caso o usuario saia de sessão.
/
/ Usuarios podem excluir tarefas ao clicar no botão X ao lado de tal, exlcuindo a parent <li>.
/ Ao deletar, o valor dessa tarefa é removido do localStorage.
*/

const inputTarefa = document.querySelector('.input-tarefa');
const addTarefa = document.querySelector('.adicionar');
const tarefas = document.querySelector('.tarefas');


addTarefa.addEventListener('click', function(){
    criaTarefa(inputTarefa.value);
})

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        criaTarefa(inputTarefa.value)
    }
})

tarefas.addEventListener('click', function(e){
    let target = e.target;
    let parente = target.parentElement;
    if (target.classList.contains('remove') && parente.classList.contains('tarefa')){
        removeTarefa(target);
    }
}) 

abrirTarefasSalvas()

// Function configs

function criaTarefa(textoInput){
    if(!textoInput){
        console.log('vazio')
        return
    }

    let li = criaLI()
    let btn = criaRemoveBTN()
   
    li.innerText = textoInput
    li.appendChild(btn)
    tarefas.appendChild(li)
    salvaTarefas()
    limpaInput()
}

function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaLI(){
    let li = document.createElement('li')
    li.classList.add('tarefa')
    return li
}

function criaRemoveBTN(){
    let btn = document.createElement('button')
    btn.setAttribute('class','btn round-btn remove')
    btn.setAttribute('title','Remover Tarefa')
    btn.innerText = "X"
    return btn
}

function removeTarefa(tarefa) {
    tarefa.parentElement.remove()
    salvaTarefas()
}

function salvaTarefas() {
    let listaTarefas = tarefas.querySelectorAll('.tarefa')
    let tarefasParaSalvar = []

    for (let task of listaTarefas){
        let tarefaText = task.innerText
        tarefaText = tarefaText.replace('X','').trim()
        tarefasParaSalvar.push(tarefaText)
    }

    let tarefasJSON = JSON.stringify(tarefasParaSalvar);
    localStorage.setItem('tarefas', tarefasJSON)
}

function abrirTarefasSalvas() {
    let tarefasJSON = localStorage.getItem('tarefas')
    let listaTarefas = JSON.parse(tarefasJSON)
    for (let tarefa of listaTarefas){
        criaTarefa(tarefa)
    }
}
