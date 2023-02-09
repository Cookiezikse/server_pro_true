const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "thesense",
    host: "mysql-thesense.alwaysdata.net",
    password: "Dene10141175",
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



app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("Bonjour")

    con.query("INSERT INTO utilisateur (email_uti, nom_uti, prenom_uti , mot_de_passe_uti) VALUES (?, ?, ? , ?)", [email, username,username, password], 
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