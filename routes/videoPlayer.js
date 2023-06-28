const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  const videoName = req.params.id;
  const caminhoVideo = `/video/${videoName}.mp4`; // Id que recebe o link do video
  //No futuro sera substituido por um link de video do servidor ou banco de dados
  res.render('videoPlayer', { title: 'Kitty Club | Video', id: req.params.id, caminhoVideo: caminhoVideo });
});

module.exports = router;