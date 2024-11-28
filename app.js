const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const path = require('path');
const { connect } = require('http2');

const app = express();

// Configuration du port
const PORT = 3000;

// Configurer le moteur de template Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Configurer les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configurer la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Changez avec votre utilisateur MySQL
    password: '', // Ajoutez votre mot de passe MySQL
    database: 'produits_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Route principale
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM produits';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { produits: results });
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
app.get("/api/likes/:pid",function(req,res){
    var prid=req.params.pid
    var sql='INSERT INTO `like`(`produit_id`) VALUES (?)'
    db.query (sql,[prid],function(err,result){
        console.log(result)

    })
})