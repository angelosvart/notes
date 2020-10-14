//All notes will be saved in a Set
const Notes = new Set();

//Creating query selectors to manipulate the DOM
const inputSelector = document.querySelector("#noteinput");
const sendSelector = document.querySelector("#noteadd");
const renderSelector = document.querySelector(".view");
const errorSelector = document.querySelector(".error");

//This function will check for empty or duplicated notes, or will add new notes and call the function to render them.
function addNote() {
    errorSelector.innerHTML = "";
    if (!inputSelector.value) {
        const textNode = document.createTextNode("No es posible añadir una nota vacía.");
        errorSelector.appendChild(textNode);
    } else if (Notes.has(inputSelector.value)) {
        const textNode = document.createTextNode("¡Esta nota ya existe!");
        errorSelector.appendChild(textNode);
    } else {
        Notes.add(inputSelector.value);
        inputSelector.value = "";
        renderNotes();
    }
}

//This function will loop through the Set and display all notes. 
//Since we are dealing with plain text blocks, the whole block of notes will be re-rendered when a note is created or deleted.
function renderNotes() {
    renderSelector.innerHTML = "";

    for (let note of Notes) {
        const containerDiv = document.createElement('div');
        const noteContain = document.createElement('div');
        const textNode = document.createTextNode(note);
        const deleteButton = document.createElement('i');
        
        containerDiv.className = "note";
        deleteButton.className = "delete fa fa-trash";
        
        noteContain.appendChild(textNode);
        containerDiv.appendChild(noteContain);
        containerDiv.appendChild(deleteButton);
        renderSelector.appendChild(containerDiv);
    }
}

//This function will remote the note from the Set and call the render function.
function removeNote(event) {
    const deleteText = event.target.parentNode.textContent;
    Notes.delete(deleteText);
    renderNotes();
}

//Event listeners to add and delete notes
sendSelector.addEventListener('click', addNote);
inputSelector.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addNote();
    }
  });
renderSelector.addEventListener('click', function(event) {
    if (event.target.tagName === "I") {
        removeNote(event);
    }
});