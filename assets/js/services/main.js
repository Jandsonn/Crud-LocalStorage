const databaseService = DatabaseService('clientes');
var editando;



document.addEventListener('keydown', function(evt)
{
    const input = document.getElementById('input-novo');
    
    if(evt.keyCode == 13  && input.value.trim() != ''){
        
        let item = {
            id: new Date().getTime(),
            nome: input.value
        };


        addItem(item);
        createLi(item);
        input.value = null;
    }

});

function addItem(item)
{
    databaseService.save(item);

}

function deleteItem(item){
    let li = document.getElementById('cliente-'+item.id);
    li.remove();
    databaseService.deleteItem(item);

};




function ShowEditar(item)
{
    editando = item;
    let editar = document.getElementById('editar');
    let inputEditar = document.getElementById('input-editar');
    editar.classList.remove('hidden');
    inputEditar.value = item.nome;

}


function editar()
{
    let inputEditar = document.getElementById('input-editar');
    editando.nome = inputEditar.value;
    let li = document.getElementById('cliente-'+editando.id);
    li.firstElementChild.innerHTML = editando.nome;
    databaseService.updateItem(editando);
    let editar = document.getElementById('editar');
    inputEditar.value = null;
    editar.classList.add('hidden');

}


function createLi(item)
{
    let ul = document.getElementById('tarefas')
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.id = 'cliente-'+item.id;
    li.innerHTML = `
        
        <span>${item.nome}</span>
        <div class="secondary-content">
            <i onclick='ShowEditar(${JSON.stringify(item)})'  class="material-icons green-text">create</i>
            <i onclick='deleteItem(${JSON.stringify(item)})' class="material-icons red-text">do_not_disturb_on</i>
        </div>

    `;

    ul.appendChild(li);


}

function createElements()
{
    let lista = databaseService.get();
    lista.forEach(valor => 
    {
        createLi(valor);

    });
}


createElements();