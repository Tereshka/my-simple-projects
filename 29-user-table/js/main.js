const URL = 'https://raw.githubusercontent.com/Tereshka/my-simple-projects/master/29-user-table/js/data.json';
let users = [];
let tableBody = null;
let buttonAddUser = null;

/**
 * Main method. Init all functionality
 */
async function init() {
  tableBody = document.querySelector('#table-body');
  buttonAddUser = document.querySelector('#button-add-user');

  buttonAddUser.addEventListener('click', (e) => addUser(e));

  users = await getResource(URL);

  fillTable(users);
}

/**
 * Load data from url
 * @param {string} url 
 */
async function getResource(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error from ${url} with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Fill table with provided data
 */
function fillTable(users) {
  for (let i = 0; i < users.length; i++) {
    const row = createNewRow(users[i]);
    tableBody.appendChild(row);
  }
}

/**
 * Create new row for a user
 * @param {User} user 
 */
function createNewRow(user) {
  const row = document.createElement('tr');
  row.setAttribute('id', `row-user-${user.id}`);

  const tdName = document.createElement('td');
  tdName.setAttribute('id', `row-user-name-${user.id}`);
  tdName.textContent = user.name;
  
  const tdPhone = document.createElement('td');
  tdPhone.setAttribute('id', `row-user-phone-${user.id}`);
  tdPhone.textContent = user.phone;
  
  const tdButtonEdit = document.createElement('td');
  tdButtonEdit.appendChild(createEditButton(user.id));
  const tdButtonDelete = document.createElement('td');
  tdButtonDelete.appendChild(createDeleteButton(user.id));

  const tdForm = document.createElement('td');
  tdForm.setAttribute('id', `row-user-form-${user.id}`);
  tdForm.setAttribute('colspan', 2);
  tdForm.appendChild(createEditForm(user));
  tdForm.style.display = 'none';

  row.appendChild(tdName);
  row.appendChild(tdPhone);
  row.appendChild(tdForm);
  row.appendChild(tdButtonEdit);
  row.appendChild(tdButtonDelete);

  return row;
}

/**
 * Create Edit button for the row
 * @param {number} id 
 */
function createEditButton(id) {
  const button = document.createElement('button');
  button.setAttribute('id', `row-user-button-edit-${id}`);
  button.textContent = 'Edit';
  button.setAttribute('class', 'btn btn-primary');

  button.addEventListener('click', (e) => {
    document.querySelector(`#row-user-name-${id}`).style.display = 'none';
    document.querySelector(`#row-user-phone-${id}`).style.display = 'none';
    document.querySelector(`#row-user-form-${id}`).style.display = 'table-cell';
    document.querySelector(`#row-user-button-edit-${id}`).style.display = 'none';
  });

  return button;
}

/**
 * Create Delete button for the row
 * @param {number} id 
 */
function createDeleteButton(id) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.setAttribute('class', 'btn btn-danger');

  button.addEventListener('click', (e) => {
    const currentRow = document.querySelector(`#row-user-${id}`);
    tableBody.removeChild(currentRow);
    users = users.filter(el => el.id !== id);
  });

  return button;
}

/**
 * Create form for editing existing user
 * @param {User} user 
 */
function createEditForm(user) {
  const form = document.createElement('form');
  form.setAttribute('id', `form-edit-${user.id}`);
  form.setAttribute('class', 'form-inline ml-3 mb-3');
  form.innerHTML = `<label class="sr-only" for="field-name">Name</label>
    <input type="text" class="form-control mb-2 mr-sm-2" id="field-name-${user.id}" placeholder="Jane Doe" value=${user.name}>
    <label class="sr-only" for="field-phone">Phone</label>
    <input type="text" class="form-control mb-2 mr-sm-2" id="field-phone-${user.id}" placeholder="+0000000000" value=${user.phone}>
    <span id="field-error${user.id}" class="error"></span>
    <button id="button-save-user-${user.id}" type="button" class="btn btn-primary mb-2" onclick="updateUser(${user.id})">Save</button>
    <button id="button-cancel-user-${user.id}" type="button" class="btn btn-danger mb-2" onclick="hideForm(${user.id})">Cancel</button>`;

  return form;
}

/**
 * Update information about user with provided id
 * @param {number} id 
 */
function updateUser(id) {
  let error = '';
  showError(error, id);

  const user = users.find(el => el.id === id);

  const name = document.querySelector(`#field-name-${id}`).value;
  if (name === '') {
    error = 'Name is empty. ';
  }
  const phone = document.querySelector(`#field-phone-${id}`).value;
  if (phone === '' || !/^\+?[\d-]+$/gm.test(phone)) {
    error += 'Phone is empty OR is not correct.';
  }
  if (error !== '') {
    showError(error, id);
    return;
  }

  user.name = name;
  user.phone = phone;

  document.querySelector(`#row-user-name-${id}`).textContent = name;
  document.querySelector(`#row-user-phone-${id}`).textContent = phone;

  hideForm(id);
}

/**
 * Hide editing form
 * @param {number} id 
 */
function hideForm(id) {
  const user = users.find(el => el.id === id);

  document.querySelector(`#field-name-${id}`).value = user.name;
  document.querySelector(`#field-phone-${id}`).value = user.phone;
  document.querySelector(`#row-user-name-${id}`).style.display = 'table-cell';
  document.querySelector(`#row-user-phone-${id}`).style.display = 'table-cell';
  document.querySelector(`#row-user-form-${id}`).style.display = 'none';
  document.querySelector(`#row-user-button-edit-${id}`).style.display = 'table-cell';
  showError('', id);
}

/**
 * Get max id value from the user lists
 */
function getMaxId() {
  return Math.max(...users.map(el => el.id));
}

/**
 * Add new user to the table
 * @param {Event} e 
 */
function addUser(e) {
  e.preventDefault();
  let error = '';
  showError(error);

  const fieldName = document.querySelector('#field-name');
  const name = fieldName.value;
  if (name === '') {
    error = 'Name is empty. ';
  }

  const fieldPhone = document.querySelector('#field-phone');
  const phone = fieldPhone.value;
  if (phone === '' || !/^\+?[\d-]+$/gm.test(phone)) {
    error += 'Phone is empty OR is not correct.';
  }

  if (error !== '') {
    showError(error);
    return;
  }

  const newUser = {
    id: getMaxId() + 1,
    name,
    phone,
  };
  users.push(newUser);
  const row = createNewRow(newUser);
  tableBody.appendChild(row);
  
  fieldName.value = '';
  fieldPhone.value = '';
}

/**
 * Show error message 
 * @param {string} text 
 */
function showError(text, id = '') {
  const errorSpan = document.querySelector(`#field-error${id}`);
  errorSpan.textContent = text;
}
