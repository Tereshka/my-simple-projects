const Application = {
    create() {
        const bin = new Bin();
        document.querySelector('.row').appendChild(bin.element);

        document.querySelector('[data-action-addColumn]')
            .addEventListener('click', function (event) {
                const column = new Column();
                document.querySelector('.columns').appendChild(column.element);
            });

        Application.load();
    },
    save() {
        const object = {
            columnIdCounter: 0,
            noteIdCounter: 0,
            columns: [],
        };

        document.querySelectorAll('.column').forEach(columnElement => {
            const notes = Array.from(columnElement.querySelectorAll('.note')).map(noteElement => {
                const note = {
                    id: parseInt(noteElement.getAttribute('data-note-id')),
                    text: noteElement.textContent,
                };
                return note;
            });
            const column = {
                id: parseInt(columnElement.getAttribute('data-column-id')),
                title: columnElement.querySelector('.column-header').textContent,
                notes: notes,
            };
            object.columns.push(column);
        });

        object.columnIdCounter = Column.idCounter;
        object.noteIdCounter = Note.idCounter;

        localStorage.setItem('myTrello', JSON.stringify(object));
    },

    load() {
        if (!localStorage.getItem('myTrello')) return;

        const object = JSON.parse(localStorage.getItem('myTrello'));

        Column.idCounter = object.columnIdCounter;
        Note.idCounter = object.noteIdCounter;

        object.columns.forEach(column => {
            let columnElement = new Column(column.id, column.title);

            column.notes.forEach(note => {
                let noteElement = new Note(note.id, note.text);
                columnElement.addNote(noteElement);
            });

            document.querySelector('.columns').appendChild(columnElement.element);
        });
    },
};