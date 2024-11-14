// ! 🔥 💪🏻 Bn Ramadan fullstack MERN project 1 ( Todo App )

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_STRING =
  'mongodb+srv://admin:medomano123@cluster0.uycfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DATABASENAME = 'todoappdb';
let database;

async function startServer() {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    database = client.db(DATABASENAME);
    console.log('MongoDB Connection Successful');

    // Get all notes
    app.get('/api/todoapp/GetNotes', async (req, res) => {
      try {
        const notes = await database
          .collection('todoappcollection')
          .find({})
          .toArray();
        res.json(notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
      }
    });

    // Add new note
    app.post('/api/todoapp/AddNotes', async (req, res) => {
      try {
        const { newNotes } = req.body;
        console.log('Received note:', newNotes);

        if (!newNotes) {
          return res
            .status(400)
            .json({ error: 'Note description is required' });
        }

        const count = await database
          .collection('todoappcollection')
          .countDocuments();
        const result = await database
          .collection('todoappcollection')
          .insertOne({
            id: (count + 1).toString(),
            description: newNotes,
          });

        if (result.acknowledged) {
          res.json('Added Successfully');
        } else {
          res.status(500).json({ error: 'Failed to add note' });
        }
      } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Failed to add note' });
      }
    });

    // Delete note
    app.delete('/api/todoapp/DeleteNotes', async (req, res) => {
      try {
        const { id } = req.query;
        console.log('Deleting note with ID:', id);

        if (!id) {
          return res.status(400).json({ error: 'Note ID is required' });
        }

        const result = await database
          .collection('todoappcollection')
          .deleteOne({
            id: id,
          });

        if (result.deletedCount > 0) {
          res.json('Deleted Successfully');
        } else {
          res.status(404).json({ error: 'Note not found' });
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Failed to delete note' });
      }
    });

    const PORT = 5038;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

// ! " The end of this project is the completing of future successes and creativity , Just strive, be patient, commit and keep going. "
// ! 🔥 💪🏻 Always forward! 💪🏻 🔥
