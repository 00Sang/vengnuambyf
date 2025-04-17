import Lyrics from '../models/lyrics.js'; 

class LyricsController {
  async getAll(req, res) {
    try {
      const lyrics = await Lyrics.findAll(); // Fetch all lyrics
      res.status(200).json(lyrics);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async getLyrics(req, res) {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    try {
      const lyrics = await Lyrics.findByPk(id); // Fetch lyrics by primary key
      if (!lyrics) {
        return res.status(404).json({ error: 'Lyrics not found' });
      }
      res.status(200).json(lyrics);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async addNewLyrics(req, res) {
    const { title, content, author } = req.body;
    try {
      let author = req.body.author;
      author = "";
      const newLyrics = await Lyrics.create({ title, content, author });
      res.status(201).json(newLyrics);
    } catch (error) {
      console.error('Error adding new lyrics:', error);
      res.status(500).json({ error: 'An error occurred while adding the lyrics.' });
    }
  }

  async updateLyrics(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const { title, content, author } = req.body;
    try {
      const lyrics = await Lyrics.findByPk(id);
      if (!lyrics) {
        return res.status(404).json({ error: 'Lyrics not found' });
      }

      // Update the lyrics
      lyrics.title = title || lyrics.title;
      lyrics.content = content || lyrics.content;
      lyrics.author = author || lyrics.author;

      await lyrics.save(); // Save the updated lyrics
      res.status(200).json(lyrics);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the lyrics.' });
    }
  }

//  Uncomment to enable the delete functionality
  async deleteLyrics(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    try {
      const lyrics = await Lyrics.findByPk(id);
      if (!lyrics) {
        return res.status(404).json({ error: 'Lyrics not found' });
      }

      await lyrics.destroy();
      res.status(200).json({ message: 'Lyrics deleted successfully.' });
    } catch (error) {
      console.error('Error deleting lyrics:', error);
      res.status(500).json({ error: 'An error occurred while deleting the lyrics.' });
    }
  }
}

export default new LyricsController();
