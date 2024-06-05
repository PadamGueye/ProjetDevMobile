function ajouterTache() {
    const taskField = document.getElementById('taskField');
    const taskList = document.getElementById("taskList");
    const taskListDone = document.getElementById("taskListDone");

    if (taskField.value.trim()) {
        let newItem = document.createElement('li');
        newItem.classList.add('task-item');
        newItem.innerHTML = `${taskField.value}`;

        taskList.appendChild(newItem);

        $(newItem).on('swiperight', function(e){
            if(newItem.parentNode.id === 'taskList'){
                taskListDone.appendChild(newItem);
            }
            else if(newItem.parentNode.id === 'taskListDone'){
                taskList.appendChild(newItem);
            }
        });

        $(newItem).on('swipeleft', function(e){
            $(this).remove();
        });

        $(taskList).listview('refresh');
        $(taskListDone).listview('refresh');
        taskField.value = '';
        taskField.select();

        saveTasks();
    } else {
        alert("Veuillez entrer une tâche.");
    }
}

function reinitialiserListe() {
    const taskField = document.getElementById('taskField');
    const taskListDone = document.getElementById('taskListDone');
    const taskList = document.getElementById("taskList");

    taskField.value = '';
    taskList.innerHTML = '';
    taskListDone.innerHTML = '';
    taskField.focus();

    saveTasks();
}

function supprimerTache(button) {
    const li = button.parentNode;
    li.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList").innerHTML;
    const taskListDone = document.getElementById("taskListDone").innerHTML;
    
    localStorage.setItem("tasks", taskList);
    localStorage.setItem("tasksDone", taskListDone);
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const taskListDone = document.getElementById("taskListDone");

    taskList.innerHTML = localStorage.getItem("tasks");
    taskListDone.innerHTML = localStorage.getItem("tasksDone");

    $("#taskList li").each(function() {
        $(this).on('swiperight', function(e){
            taskListDone.appendChild(this);
        });

        $(this).on('swipeleft', function(e){
            $(this).remove();
        });
    });

    $("#taskListDone li").each(function() {
        $(this).on('swiperight', function(e){
            taskList.appendChild(this);
        });

        $(this).on('swipeleft', function(e){
            $(this).remove();
        });
    });

    $(taskList).listview('refresh');
    $(taskListDone).listview('refresh');
}

$(document).ready(function() {
    loadTasks();
});
