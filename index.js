const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "thesense",
    host: "mysql-thesense.alwaysdata.net",
    password: "TheSense2000!",
    database: "thesense_thesense"
})
con.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log('Connecté à la BDD')
    }
})

app.get('/user/:id?', (req, res) => {
    const {id} = req.params;
    console.log("Bonjour");

    con.query("SELECT * FROM utilisateur WHERE id_utilisateur = ? ", [id], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result});
            }
        }
    )
})

app.get('/reser/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);

    con.query("SELECT date_reser,nom_salle FROM reservation INNER JOIN salle ON reservation.id_salle = salle.id_salle WHERE client_id = ? ", [id], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    )
})



app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("Bonjour")

    con.query("INSERT INTO utilisateur (email_uti, nom_uti, prenom_uti , mot_de_passe_uti) VALUES (?, ?, ? , ?)", [email, username,username,  password_hash(password, PASSWORD_ARGON2I)], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})

app.post('/resa_dark', (req, res) => {
    const date = req.body.date;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const nbr = req.body.nbr;
    const tel = req.body.tel;
    const id = req.body.id;
    console.log("Bonjour")

    con.query("INSERT INTO reservation (date_reser, client_id, id_salle, nom_resa, prenom_resa, mail_resa , nbr_resa , tel_resa) VALUES (?, ?, ? , ?, ?, ?, ?, ?)", [date,id,3,nom, prenom, email, nbr, tel], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})
app.post('/resa_light', (req, res) => {
    const date = req.body.date;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const nbr = req.body.nbr;
    const tel = req.body.tel;
    const id = req.body.id;
    console.log("Bonjour")

    con.query("INSERT INTO reservation (date_reser, client_id, id_salle, nom_resa, prenom_resa, mail_resa , nbr_resa , tel_resa) VALUES (?, ?, ? , ?, ?, ?, ?, ?)", [date,id,1,nom, prenom, email, nbr, tel], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})
app.post('/resa_battle', (req, res) => {
    const date = req.body.date;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const nbr = req.body.nbr;
    const tel = req.body.tel;
    const id = req.body.id;
    console.log("Bonjour")

    con.query("INSERT INTO reservation (date_reser, client_id, id_salle, nom_resa, prenom_resa, mail_resa , nbr_resa , tel_resa) VALUES (?, ?, ? , ?, ?, ?, ?, ?)", [date,id,5,nom, prenom, email, nbr, tel], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})
app.post('/contact', (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const message = req.body.message;

    console.log("Bonjour")

    con.query("INSERT INTO contact (nom, prenom, email , message) VALUES (?, ?, ? , ?)", [nom, prenom,email, message], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM utilisateur WHERE nom_uti = ? AND mot_de_passe_uti = ?", [username, password], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})