import express from 'express';
import LyricsController from '../controllers/controller.js';

const router = express.Router(); 


router.post('/v1/add', LyricsController.addNewLyrics);
router.get('/v1/getAll', LyricsController.getAll);
router.get('/v1/get/:id', LyricsController.getLyrics);  
router.put('/v1/update/:id', LyricsController.updateLyrics); 
router.delete('/v1/delete/:id', LyricsController.deleteLyrics); 



export default router;