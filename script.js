const noteInput = document.getElementById("noteText");
const notesContainer = document.getElementById("notesContainer");

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach(note => addNoteToDOM(note.text, note.time));

// Add note on Enter key
noteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && noteInput.value.trim() !== "") {
    const noteText = noteInput.value.trim();
    const now = new Date();
    const timeStamp = now.toLocaleString();
    addNoteToDOM(noteText, timeStamp);
    saveNote(noteText, timeStamp);
    noteInput.value = "";
  }
});

// Save note to localStorage
function saveNote(text, time) {
  notes.push({text, time});
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add note to DOM
function addNoteToDOM(text, time) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note");

  const noteTextEl = document.createElement("p");
  noteTextEl.textContent = text;

  const timeEl = document.createElement("span");
  timeEl.textContent = time;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    noteEl.remove();
    notes = notes.filter(n => n.text !== text || n.time !== time);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  noteEl.appendChild(noteTextEl);
  noteEl.appendChild(timeEl);
  noteEl.appendChild(deleteBtn);
  notesContainer.appendChild(noteEl);
}
