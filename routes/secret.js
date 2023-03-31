var express = require('express');
var router = express.Router();

/* GET sexo page. */
router.get('/', function(req, res, next){
    res.render('secret', {title: 'Kitty  Club | Segredo'});
});

module.exports = router;
