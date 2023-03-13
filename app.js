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


 //legger til css og game.js
app.get('/css.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css.css'));
  });
  
  app.get('/game.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
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
  
    if (await bcrypt.compare(login.password, userData.password)) {
      req.session.loggedin = true;
      req.session.iduser = userData.iduser; // Set the iduser session variable
      res.redirect("/");
    } else {
      res.redirect("back");
    }
  });

  app.post("/addUser", async (req, res) => {
    let svar = req.body;

    let password = await bcrypt.hash(svar.password, 10) // Fix: Use bcrypt.hash instead of bcrypt.password
    console.log(svar)
    console.log(password)

    db.prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)").run(svar.name, svar.email, password)
    
    res.redirect("back")    
})

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });

app.use(express.urlencoded({extended: true}))

// Eksempel for å vise når en cookie blir satt

app.get("/", (req, res) => {
    console.log(req.session)
    if (req.session.visits == undefined) {
        req.session.visits = 1
    } else {
        req.session.visits++
    }
    
    res.send("Antall besøkende: " + req.session.visits)
})

//rute for admin siden
app.get("/admin", (req, res) => {
    let users = db.prepare("SELECT * FROM user").all(); //henter brukere fra databasen

    res.render("admin", { users: users }); //data til bruker sendes til admin.hbs
});

app.set('view engine', 'hbs'); //express tolker hbs
app.set('views', __dirname + '/views'); //hbs filer ligger i mappen "views" 


app.get('/app.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'app.js'));
  });

app.get('/play', (req, res) => {
    if (!req.session.iduser) {
      return res.redirect('/login');
    }
  

    res.sendFile(path.join(__dirname, 'welcome.html'));
  });

  app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'welcome.html'));
  });

  function updateGameResult(result) {
    fetch('/update-game-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  app.post("/update-game-result", (req, res) => {
    console.log("Received update game result request");
    const { result } = req.body;
    const iduser = req.session.iduser; // Get the iduser session variable
  
    if (!iduser) {
      return res.status(401).json({ message: "Not authorized" });
    }
  
    const user = db.prepare("SELECT wins, losses FROM user WHERE iduser = ?").get(iduser);
  
    if (result === "win") {
      db.prepare("UPDATE user SET wins = ? WHERE iduser = ?").run(user.wins + 1, iduser);
      console.log("Updated wins for user", iduser);
    } else if (result === "loss") {
      db.prepare("UPDATE user SET losses = ? WHERE iduser = ?").run(user.losses + 1, iduser);
      console.log("Updated losses for user", iduser);
    } else {
      console.log("Invalid game result");
    }
  
    res.json({ message: "Game result updated" });
  });
  
  app.post("/deleteUser", (req, res) => {
  const iduser = req.body.iduser;

  db.prepare("DELETE FROM user WHERE iduser = ?").run(iduser);

  res.redirect("/admin");
});
  
















app.listen("3000", () => {
    console.log("Server listening at http://localhost:3000")
})