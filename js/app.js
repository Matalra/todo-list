const inputTarefa = document.querySelector('.input-tarefa')
const addTarefa = document.querySelector('.adicionar')
const tarefas = document.querySelector('.tarefas')

addTarefa.addEventListener('click', function(){
    if(!inputTarefa.value){
        console.log('vazio');
        return
    }
    console.log(inputTarefa.value);
})