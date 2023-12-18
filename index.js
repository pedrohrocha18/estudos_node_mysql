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
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

//get
app.get("/bandas", (req, res) => {
  const query = `SELECT * FROM bandas`;

  conexao.query(query, (err, data) => {
    if (err) {
      console.log(err);
    }
    const check = data.length == 0;
    const banda = data;

    res.render("bandas", { check, banda });
  });
});

//resgate por id
app.get("/bandas/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM bandas WHERE id = ${id}`;

  conexao.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const banda = data[0];
    res.render("banda", { banda });
  });
});

//edit
app.get("/bandas/edit/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM bandas WHERE id = ${id}`;

  conexao.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const banda = data[0];

    res.render("editfavorite", { banda });
  });
});

app.post("/bandas/update", (req, res) => {
  const id = req.body.id;
  const music = req.body.musicband;
  const title = req.body.nameband;
  const style = req.body.styleband;

  const query = `UPDATE bandas SET musicband = '${music}', nameband = '${title}', styleband = '${style}' WHERE id = ${id} `;

  conexao.query(query, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/bandas");
  });
});

//remove
app.post("/bandas/remove/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM bandas WHERE id = ${id}`;

  conexao.query(query, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/bandas");
  });
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
