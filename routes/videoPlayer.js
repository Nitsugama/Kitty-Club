const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  const imageName = req.params.id;
  const caminhoImagem = `/images/${imageName}.jpg`; // Substitua pela extensão correta da imagem, se necessário
  res.render('videoPlayer', { title: 'Kitty Club | Video', id: req.params.id, caminhoImagem: caminhoImagem });
});

module.exports = router;
