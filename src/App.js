// ! 🔥 💪🏻 Bn Ramadan fullstack MERN project 1 ( Todo App )

import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: '',
    };
  }

  API_URL = 'http://localhost:5038';

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    try {
      const response = await fetch(`${this.API_URL}/api/todoapp/GetNotes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Failed to load notes. Please try again.');
    }
  }

  async addClick() {
    try {
      const { newNote } = this.state;
      if (!newNote.trim()) {
        alert('Please enter a note');
        return;
      }

      const response = await fetch(`${this.API_URL}/api/todoapp/AddNotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newNotes: newNote }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      this.setState({ newNote: '' });
      await this.refreshNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note. Please try again.');
    }
  }

  async deleteClick(id) {
    try {
      const response = await fetch(
        `${this.API_URL}/api/todoapp/DeleteNotes?id=${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      await this.refreshNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  }

  handleInputChange = (e) => {
    this.setState({ newNote: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addClick();
    }
  };

  render() {
    const { notes, newNote } = this.state;
    return (
      <div className="App">
        <h2>Todo App</h2>
        <div className="input-container">
          <input
            value={newNote}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Enter new note"
          />
          <button onClick={() => this.addClick()}>Add Note</button>
        </div>
        <div className="notes-container">
          {notes.length === 0 ? (
            <p>No notes yet. Add your first note!</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-item">
                <span>{note.description}</span>
                <button onClick={() => this.deleteClick(note.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;

// ! " The end of this project is the completing of future successes and creativity , Just strive, be patient, commit and keep going. "
// ! 🔥 💪🏻 Always forward! 💪🏻 🔥
