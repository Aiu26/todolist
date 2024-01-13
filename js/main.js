const createTodo = (todo) => {
	const item = document.createElement('li');
	item.classList.add('display');

	const para = document.createElement('p');
	para.classList.add('task');
	const textnode = document.createTextNode(todo);
	para.appendChild(textnode);
	item.appendChild(para);

	const div = document.createElement('div');
	div.classList.add('sidebuttons');

	const deletebutton = document.createElement('button');
	deletebutton.classList.add('delete');
	const deletetextnode = document.createTextNode('Delete');
	deletebutton.appendChild(deletetextnode);

	const editbutton = document.createElement('button');
	editbutton.classList.add('edit');
	const edittextnode = document.createTextNode('Edit');
	editbutton.appendChild(edittextnode);

	div.appendChild(deletebutton);
	div.appendChild(editbutton);
	item.appendChild(div);

	deletebutton.addEventListener('click', () => {
		let todos = JSON.parse(localStorage.getItem('todo'));
		todos = todos.filter((t) => t !== para.textContent);
		localStorage.setItem('todo', JSON.stringify(todos));

		item.remove();
	});
	editbutton.addEventListener('click', () => {
		para.style.display = 'none';
		editbutton.disabled = true;
		const form = document.createElement('form');
		const input = document.createElement('input');
		input.type = 'text';
		input.classList.add('editinput');
		input.value = para.textContent;
		form.appendChild(input);
		item.prepend(form);
		input.focus();
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let todos = JSON.parse(localStorage.getItem('todo'));
			const index = todos.findIndex((t) => t === para.textContent);

			para.textContent = input.value;
			para.style.display = 'block';
			editbutton.disabled = false;

			todos[index] = para.textContent;
			localStorage.setItem('todo', JSON.stringify(todos));
			form.remove();
		});
	});

	return item;
};

document.getElementById('add').addEventListener('submit', (e) => {
	e.preventDefault();
	const listNode = document.getElementById('list');
	const todo = document.getElementById('iteminput').value;
	if (todo !== '') {
		const item = createTodo(todo);
		listNode.appendChild(item);
		document.getElementById('iteminput').value = '';
		const todos = JSON.parse(localStorage.getItem('todo'));
		todos.push(todo);
		localStorage.setItem('todo', JSON.stringify(todos));
	}
});

let todo = localStorage.getItem('todo');
if (todo) {
	todo = JSON.parse(todo);
	const listNode = document.getElementById('list');
	todo.forEach((t) => {
		const item = createTodo(t);
		listNode.appendChild(item);
	});
} else {
	localStorage.setItem('todo', '[]');
}
