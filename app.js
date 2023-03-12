const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("better-sqlite3")("mydb.db")

const app = express();




app.use(session({
    secret: "Einlangstringsombørveretilfeldiggenerertoglagratdidotenv",
    resave: false,
    saveUninitialized: false //Ved false settes ikke cookie (med sessionID) før en evt gjør endringer i sesjonen
})) 

app.use(express.urlencoded({extended: true}))

app.get('/css.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css.css'));
  });
  
  app.get('/game.js', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'game.js'));
  });

app.get("/regice", (req, res) => {
    res.sendFile(path.join(__dirname, "/regice.html"))
})

app.get("/", (req, res) => {
    if(req.session.loggedin) {
        res.sendFile(path.join(__dirname, "/welcome.html"))
    } else {
        res.sendFile(path.join(__dirname, "/login.html"))
    }    
})

app.post("/login", async (req, res) => {
    let login = req.body;

    let userData = db.prepare("SELECT * FROM user WHERE email = ?").get(login.email);
    
    if(await bcrypt.compare(login.password, userData.password)) {
        req.session.loggedin = true
        res.redirect("/")
    } else {
        res.redirect("back")
    }
})

app.post(("/addUser"), async (req, res) => {
    let svar = req.body;

    let password = await bcrypt.hash(svar.password, 10) // Fix: Use bcrypt.hash instead of bcrypt.password
    console.log(svar)
    console.log(password)

    db.prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)").run(svar.name, svar.email, password)
    
    res.redirect("back")    
})





app.use(session({
    secret: "Einlangstringsombørveretilfeldiggenerertoglagratdidotenv",
    resave: false,
    saveUninitialized: false //Ved false settes ikke cookie (med sessionID) før en evt gjør endringer i sesjonen
})) 

app.use(express.urlencoded({extended: true}))

// Eksempel for å vise når en cookie blir satt

app.get("", (req, res) => {
    console.log(req.session)
    if (req.session.visits == undefined) {
        req.session.visits = 1
    } else {
        req.session.visits++
    }
    
    res.send("Antall besøkende: " + req.session.visits)
})

app.get('/play', (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/login');
    }
  
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
  });


//






app.listen("3000", () => {
    console.log("Server listening at http://localhost:3000")
})