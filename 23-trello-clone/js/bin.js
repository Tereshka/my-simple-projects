class Bin {
    constructor() {
        const element = this.element = document.createElement('div');
        element.classList.add('remover');

        const image = document.createElement('img');
        image.classList.add('bin');
        image.setAttribute('src', 'img/bin.png');
        image.setAttribute('data-action-removeColumn', '');

        element.appendChild(image);

        element.addEventListener('dragover', this.dragOverHandler.bind(this));
        element.addEventListener('drop', this.dropHandler.bind(this));
    }
    
    dragOverHandler(event) {
        event.preventDefault();
        if (!Column.dragged && !Note.dragged) return;
        this.element.classList.add('remover_hover');
    }

    dropHandler(event) {
        event.preventDefault();
        if (Column.dragged) {
            Column.dragged.remove();
        } else if (Note.dragged) {
            Note.dragged.remove();
        }

        this.element.classList.remove('remover_hover');
    }
}