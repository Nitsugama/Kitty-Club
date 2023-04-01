var express = require('express');
var router = express.Router();

/* Renderiza a pagina de video*/
router.get('/:id', function(req, res, next){
    res.render('videoPlayer', { title: 'Kitty Club | Video', id: req.params.id });
});

module.exports = router;