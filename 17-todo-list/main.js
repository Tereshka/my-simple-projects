function addTask(){
    if(document.getElementById('label-empty') != null){
        document.getElementById('label-empty').remove();
    }

    var name = document.getElementById('todoName').value;
    var description = document.getElementById('todoDescription').value;

    document.getElementById('todoName').value = "";
    document.getElementById('todoDescription').value = "";

    var divTodo = document.createElement('div');
    divTodo.className ='todo-task';

    var divName = document.createElement('div');
    divName.className ='todo-task-name';

    var spanName = document.createElement('span');
    spanName.textContent = name;
    spanName.className ='todoTask';

    var spanDelete = document.createElement('span');
    spanDelete.innerHTML = '<i class="fas fa-times"></i>';
    spanDelete.className ='button-delete';

    var spanOpen = document.createElement('span');
    spanOpen.innerHTML = '<i class="fas fa-caret-right"></i>';
    spanOpen.className ='button-open';
    var spanClose = document.createElement('span');
    spanClose.innerHTML = '<i class="fas fa-caret-down"></i>';
    spanClose.className ='button-close';

    var divDescription = document.createElement('div');
    divDescription.textContent = description;
    divDescription.className ='label';

    spanDelete.addEventListener('click', function(){
        divTodo.remove();
        if(document.getElementsByClassName('todo-task').length == 0){
            var p = document.createElement('p');
            p.textContent = 'Список дел пуст...';
            p.id = 'label-empty';
            document.getElementById('tasks').appendChild(p);
        }
    });

    spanClose.addEventListener('click', function () {
        divDescription.style.display = 'none';
        spanClose.style.display = 'none';
        spanOpen.style.display = 'inline';
    });

    spanOpen.addEventListener('click', function () {
        divDescription.style.display = 'block';
        spanClose.style.display = 'inline';
        spanOpen.style.display = 'none';
    });

    divName.appendChild(spanName);
    divName.appendChild(spanDelete);
    divName.appendChild(spanOpen);
    divName.appendChild(spanClose);
    
    divTodo.appendChild(divName);
    divTodo.appendChild(divDescription);

    var tasks = document.getElementById('tasks');
    tasks.appendChild(divTodo);
}