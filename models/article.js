'use strict'

const sql = require("./db.js");

const Article = function (article) {
    this.clave = article.clave;
    this.description = article.description;
};

Article.findById = (id, result) => {
    sql.query(`SELECT * FROM vista_productos WHERE clave_producto = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Article.video = (id, result) => {
    sql.query(`SELECT * FROM inv WHERE ARTICULOID = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0].XVIDEO);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Article.features = (id, result) => {
    let query = "SELECT * FROM vista_caracteristicas";
    if (id) {
        query += ` WHERE id_producto = ${id}`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
       // console.log("features: ", res);
        result(null, res);
    });
};



module.exports = Article;