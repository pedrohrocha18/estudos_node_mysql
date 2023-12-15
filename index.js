const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

//post
app.post("/insertbanda", (req, res) => {
  const nameband = req.body.nameband;
  const musicband = req.body.musicband;
  const styleband = req.body.styleband;

  const query = `INSERT INTO bandas (nameband, musicband, styleband) VALUES ('${nameband}','${musicband}','${styleband}') `;

  conexao.query(query, (err) => {
    if(err) {
      console.log(err)
    }
    res.redirect("/")
  })
});

//conexão
const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1807.Drika",
  database: "db_fixando",
});

conexao.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Você está conectado ao Banco de Dados =)");
  }
});

app.listen(3000, () => {
  console.log("O servidor está conectado.");
});
