class Note {
    constructor(id = null, text = '') {
        const instance = this;
        let element = this.element = document.createElement('div');
        
        element.classList.add('note');
        element.setAttribute('draggable', 'true');
        if (id) {
            element.setAttribute('data-note-id', id);
        } else {
            element.setAttribute('data-note-id', Note.idCounter);
            Note.idCounter++;
        }
        element.textContent = text;
        
        element.addEventListener('dblclick', function (event) {
            element.setAttribute('contenteditable', 'true');
            element.removeAttribute('draggable');
            instance.getColumn().removeAttribute('draggable');
            instance.setCaretPosition();
            element.focus();
        });
        element.addEventListener('blur', function (event) {
            element.removeAttribute('contenteditable');
            element.setAttribute('draggable', 'true');
            instance.getColumn().setAttribute('draggable', 'true');
    
            if (element.textContent.trim().length === 0) {
                element.remove();
            }

            Application.save();
        });
    
        element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        element.addEventListener('dragend', this.dragEndHandler.bind(this));
        element.addEventListener('dragenter', this.dragEnterHandler.bind(this));
        element.addEventListener('dragover', this.dragOverHandler.bind(this));
        element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        element.addEventListener('drop', this.dropHandler.bind(this));
    }

    get column() {
        // return this.element.closest('.column');
        return this.element.parentElement.parentElement;
    }

    getColumn() {
        return this.element.parentElement.parentElement;
    }

    setCaretPosition() {
        let pos = this.element.textContent.length;
        let sel = window.getSelection();
        sel.collapse(this.element.firstChild, pos);
    }
    
    dragStartHandler(event) {
        event.stopPropagation();
        Note.dragged = this.element;
        this.element.classList.add('dragged');
    }
    
    dragEndHandler(event) {
        event.stopPropagation();
        Note.dragged = null;
        this.element.classList.remove('dragged');
    
        document.querySelectorAll('.note').forEach(el => el.classList.remove('under'));
        Application.save();
    }
    
    dragEnterHandler(event) {
        event.stopPropagation();
        if (!Note.dragged || this.element === Note.dragged) return;
        this.element.classList.add('under');
    }
    
    dragOverHandler(event) {
        event.preventDefault();
        if (!Note.dragged || this.element === Note.dragged) return;
    }
    
    dragLeaveHandler(event) {
        event.stopPropagation();
        if (!Note.dragged || this.element === Note.dragged) return;
        this.element.classList.remove('under');
    }
    
    dropHandler(event) {
        console.log(this);
        event.stopPropagation();

        if (Column.dragged && this.getColumn() !== Column.dragged) {
            const columns = Array.from(this.getColumn().parentElement.querySelectorAll('.column'));
            const indexA = columns.indexOf(this.getColumn());
            const indexB = columns.indexOf(Column.dragged);
            if (indexA > indexB) {
                this.getColumn().parentElement.insertBefore(Column.dragged, this.getColumn().nextSibling);
            } else {
                this.getColumn().parentElement.insertBefore(Column.dragged, this.getColumn());
            }

            document.querySelectorAll('.column').forEach(el => el.classList.remove('under'));

        } else if (Note.dragged || this.element !== Note.dragged) {
            if (this.element.parentElement === Note.dragged.parentElement) {
                const notes = Array.from(this.element.parentElement.querySelectorAll('.note'));
                const indexA = notes.indexOf(this.element);
                const indexB = notes.indexOf(Note.dragged);

                if (indexA > indexB) {
                    this.element.parentElement.insertBefore(Note.dragged, this.element.nextSibling);
                } else {
                    this.element.parentElement.insertBefore(Note.dragged, this.element);
                }
            } else {
                this.element.parentElement.insertBefore(Note.dragged, this.element);
            }
        }
    
        
    }
}

Note.idCounter = 0;
Note.dragged = null;