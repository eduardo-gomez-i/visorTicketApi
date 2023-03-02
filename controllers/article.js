'use strict'

const { default: axios } = require('axios');
var validator = require('validator');
var Article = require('../models/article');
const xml2js = require('xml2js');
const fs = require('fs')

var controller = {

    getArticle: (req, res) => {
        var clave = req.params.clave;
        
        Article.findById(clave, (err, article) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: article
            });
        });
    },

    getFeatures: (req, res) => {
        var id = req.params.id;
        Article.features(id, (err, features) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if (!features) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existen caracteristicas'
                });
            }

            return res.status(200).send({
                status: 'success',
                features: features
            });
        });
    },

    getVideo: (req, res) => {
        var id = req.params.id;
        Article.video(id, (err, video) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if (!video) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el video'
                });
            }

            return res.status(200).send({
                status: 'success',
                video: video
            });
        });
    },

    getXML: async (req, response) => {
        var name = req.params.name;
        var here = this;

        axios.get("http://192.168.0.250/"+name+".xml")
            .then(data => {
                var xml = data.data;
                // convert XML to JSON
                xml2js.parseString(xml, { mergeAttrs: true },(err, result) => {
                    if (err) {
                        throw err;
                    }

                    // `result` is a JavaScript object
                    // convert it to a JSON string
                    const json = JSON.stringify(result, null, 4);

                    // log JSON string
                    //console.log(json);
                    return response.status(200).send({
                        status: 'success',
                        xml: json
                    })

                });
                
            }
            )
            .catch(err => {
                return response.status(404).send({
                    status: 'error',
                    message: err
                });
            });
    },

    getImg: async (req, response) => {
        var clave = req.params.clave;
        var numImg = [];

        const path = '/var/www/html/ferremobil/public/img/productos/';

        try {
            if (fs.existsSync(path +'principal/'+clave)) {
                console.log('si existe');
                console.log(path + 'principal/' + clave);
                numImg++;
                
            }
        } catch (err) {
            console.error(err)
        }

        return response.status(200).send({
            status: 'success',
            images: numImg
        });

        

    }
};

module.exports = controller;
