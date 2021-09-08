const inputTarefa = document.querySelector('.input-tarefa');
const addTarefa = document.querySelector('.adicionar');
const tarefas = document.querySelector('.tarefas');

addTarefa.addEventListener('click', function(){
    criaTarefa(inputTarefa.value);
})

// TODO quando apertar o botao "adcionar tarefa" cria elemento <li> com botao para remover tarefa
function criaTarefa(textoInput){
    if(!textoInput){
        console.log('vazio')
        return
    }

    let li = criaLI()
    let btn = criaBTN()
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

function criaBTN(){
    let btn = document.createElement('button')
    btn.setAttribute('class','btn round-btn remove')
    btn.setAttribute('title','Remover Tarefa')
    btn.innerText = "X"
    return btn
}

// TODO quando apertar enter enquanto o input estiver focado, adiciona a tarefa escrita
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        criaTarefa(inputTarefa.value)
    }
})

// TODO quando botão com classe "remover" for clicado irá deletar o parente <li class="tarefa">,
// apagando a tarefa
tarefas.addEventListener('click', function(e){
    let target = e.target;
    let parente = target.parentElement;
    if (target.classList.contains('remove') && parente.classList.contains('tarefa')){
        removeTarefa(target);
    }
}) 

function removeTarefa(tarefa) {
    tarefa.parentElement.remove()
    salvaTarefas()
}

// TODO criar memoria local para a lista de tarefas.

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

abrirTarefasSalvas()

function abrirTarefasSalvas() {
    let tarefasJSON = localStorage.getItem('tarefas')
    let listaTarefas = JSON.parse(tarefasJSON)
    for (let tarefa of listaTarefas){
        criaTarefa(tarefa)
    }
}