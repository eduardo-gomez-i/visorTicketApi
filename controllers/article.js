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
                return res.status(200).send({
                    status: 'error',
                    video: null
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

        axios.get(`http://${process.env.XML_FILES_IP}/`+name+".xml")
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
        var numImg = 0;
        var images = [];

        const path = '/var/www/ferremobil/public/img/productos/';
        //const path = 'C:/wamp64/www/xml/';

        try {
            if (fs.existsSync(path +'principal/'+clave+'.jpg')) {+
                numImg++;
                images.push("principal")
            }

            if (fs.existsSync(path +'_001/'+clave+'_001.jpg')) {+
                numImg++;
                images.push("_001")
            }

            if (fs.existsSync(path +'_002/'+clave+'_002.jpg')) {+
                numImg++;
                images.push("_002")
            }

            if (fs.existsSync(path +'_003/'+clave+'_003.jpg')) {+
                numImg++;
                images.push("_003")
            }

            if (fs.existsSync(path +'_004/'+clave+'_004.jpg')) {+
                numImg++;
                images.push("_004")
            }

            if (fs.existsSync(path +'_005/'+clave+'_005.jpg')) {+
                numImg++;
                images.push("_005")
            }

            if (fs.existsSync(path +'_006/'+clave+'_006.jpg')) {+
                numImg++;
                images.push("_006")
            }

            if (fs.existsSync(path +'_007/'+clave+'_007.jpg')) {+
                numImg++;
                images.push("_007")
            }

            if (fs.existsSync(path +'_008/'+clave+'_008.jpg')) {+
                numImg++;
                images.push("_008")
            }

            if (fs.existsSync(path +'_009/'+clave+'_009.jpg')) {+
                numImg++;
                images.push("_009")
            }

            if (fs.existsSync(path +'_010/'+clave+'_010.jpg')) {+
                numImg++;
                images.push("_010")
            }

            if (fs.existsSync(path +'_011/'+clave+'_011.jpg')) {+
                numImg++;
                images.push("_011")
            }

            if (fs.existsSync(path +'_012/'+clave+'_012.jpg')) {+
                numImg++;
                images.push("_012")
            }
        } catch (err) {
            console.error(err)
        }

        return response.status(200).send({
            status: 'success',
            numImages: numImg,
            images: images
        });

        

    }
};

module.exports = controller;
