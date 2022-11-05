'use strict'

var express = require('express');

var ArticleController = require('../controllers/article');

var router = express.Router();

router.get('/article/:clave', ArticleController.getArticle);
router.get('/image/:clave', ArticleController.getImg);
router.get('/features/:id', ArticleController.getFeatures);
router.get('/video/:id', ArticleController.getVideo);
router.get('/xml/:name', ArticleController.getXML);

module.exports = router;