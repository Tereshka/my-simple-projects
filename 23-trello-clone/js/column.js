class Column {

    constructor(id = null, title = 'Новая колонка') {
        const instance = this;
        this.notes = [];
        const element = this.element = document.createElement('div');

        element.classList.add('column');
        element.setAttribute('draggable', 'true');
        if (id) {
            element.setAttribute('data-column-id', id);
        } else {
            element.setAttribute('data-column-id', Column.idCounter);
            Column.idCounter++;
        }
        
        element.innerHTML = 
        `<p class="column-header" contenteditable="true"></p>
        <div data-notes></div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`;
        element.querySelector('.column-header').textContent = title;

        const addNoteSpan = element.querySelector('[data-action-addNote]');
        addNoteSpan.addEventListener('click', function (event) {
            let note = new Note();
            instance.addNote(note);
            
            note.element.setAttribute('contenteditable', 'true');
            note.element.focus();
        });

        const header = element.querySelector('.column-header')
        header.addEventListener('dblclick', function (event) {
            header.setAttribute('contenteditable', 'true');
            header.focus();
        });
        header.addEventListener('blur', function (event) {
            header.removeAttribute('contenteditable');

            Application.save();
        });

        element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        element.addEventListener('dragend', this.dragEndHandler.bind(this));
        element.addEventListener('dragover', this.dragOverHandler.bind(this));
        element.addEventListener('drop', this.dropHandler.bind(this));
    }

    addNote(...notes) {
        for(const note of notes) {
            if (!this.notes.includes(note)) {
                this.notes.push(note);
            }

            this.element.querySelector('[data-notes]').appendChild(note.element);
        }
    }

    dragStartHandler(event) {
        event.stopPropagation();
        Column.dragged = this.element;
        this.element.classList.add('dragged');

        document.querySelectorAll('.note').forEach(el => el.removeAttribute('draggable'));
    }
    
    dragEndHandler(event) {
        Column.dragged = null;
        Column.dropped = null;
        this.element.classList.remove('dragged');
    
        document.querySelectorAll('.column').forEach(el => el.classList.remove('under'));
        document.querySelectorAll('.note').forEach(el => el.setAttribute('draggable', true));

        Application.save();
    }
    
    dragOverHandler(event) {
        event.preventDefault();
        if (!Column.dragged || this.element === Column.dragged) return;

        Column.dropped = this.element;
        document.querySelectorAll('.column').forEach(el => el.classList.remove('under'));
        this.element.classList.add('under');
    }
    
    dropHandler(event) {
        console.log(this);
        event.preventDefault();

        if (Note.dragged) {
            this.element.querySelector('[data-notes]').appendChild(Note.dragged);
        } else if (Column.dragged && this.element !== Column.dragged) {
            const columns = Array.from(this.element.parentElement.querySelectorAll('.column'));
            const indexA = columns.indexOf(this.element);
            const indexB = columns.indexOf(Column.dragged);
            if (indexA > indexB) {
                this.element.parentElement.insertBefore(Column.dragged, this.element.nextSibling);
            } else {
                this.element.parentElement.insertBefore(Column.dragged, this.element);
            }
            document.querySelectorAll('.column').forEach(el => el.classList.remove('under'));
        }
    }
}

Column.idCounter = 0;
Column.dragged = null;
Column.dropped = null;