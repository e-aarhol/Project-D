const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("better-sqlite3")("mydb.db")
const app = express();



app.use(session({
    secret: "OmniManIsReal",
    resave: false,
    saveUninitialized: false //Ved false settes ikke cookie (med sessionID) før en evt gjør endringer i sesjonen
})) 

app.use(express.urlencoded({extended: true}))


app.get("/regice", (req, res) => {
    res.sendFile(path.join(__dirname, "/www/regice.html"))
})

app.get("/", (req, res) => {
    if(req.session.loggedin) {
        res.sendFile(path.join(__dirname, "/www/index.html"))
    } else {
        res.sendFile(path.join(__dirname, "/www/login.html"))
    }    
})

app.post("/login", async (req, res) => {
    let login = req.body;

    let userData = db.prepare("SELECT * FROM user WHERE email = ?").get(login.email);
    
    if(await bcrypt.compare(login.password, userData.hash)) {
        req.session.loggedin = true
        res.redirect("/")
    } else {
        res.redirect("back")
    }
})

app.post(("/addUser"), async (req, res) => {
    let svar = req.body;

    let hash = await bcrypt.hash(svar.password, 10)
    console.log(svar)
    console.log(hash)

    db.prepare("INSERT INTO user (username, email, password) VALUES (?, ?, ?)").run(svar.name, svar.email, hash)
    
    res.redirect("back")    
})






//






app.listen("3000", () => {
    console.log("Server listening at http://localhost:3000")
})