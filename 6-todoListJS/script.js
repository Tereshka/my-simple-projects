function liDone(el){
	el.classList.toggle("done");
}

function deleteAction(el){
	el.parentElement.remove();
	event.stopPropagation();
}

function pushToDo(el){
	if (event.keyCode === 13 && el.value.length > 0){
        
        var lis = document.querySelectorAll('li');
        var todos = [];
        lis.forEach(element => {
            todos.push(element.innerText.toLowerCase());
        });
        if (todos.includes(el.value.toLowerCase()) ){
            alert('There is already such todo');
            el.value = "";
            return;
        }

		let span = document.createElement("span");
		span.innerHTML = `<i class="fas fa-trash-alt"></i>`;
		/*span.classList.add("but-delete");*/
		span.addEventListener("click", function(){deleteAction(this);});

		let li = document.createElement("li");
		li.textContent = el.value;
		li.insertBefore(span, li.childNodes[0]);

		li.addEventListener("click", function(){liDone(this);});
		
		document.querySelector("ul").appendChild(li);

		el.value = "";
	}
}

function showInput(){
	let i = document.querySelector("input");
	i.style.display == "none" ? i.style.display = "" : i.style.display = "none";
}