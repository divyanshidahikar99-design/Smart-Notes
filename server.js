const express = require('express')
const fs = require("fs")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")


app.get("/show", (req, res) => {
  res.render("show")
})


app.get('/', (req, res) => {

  fs.readdir("./files", (err, files) => {

    res.render('index', { files })
  })

})

app.post("/create", (req, res) => {

  let { title, description } = req.body;

  let filename = title.split(" ").join("") + ".txt"

  fs.writeFile(`./files/${filename}`, description, (err, result) => {
    res.redirect("/")
  })

})


app.get("/files/:filename", (req, res) => {

  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("show", { filename: req.params.filename, data })
  })
})

app.get("/delete/files/:filename", (req, res) => {

  fs.unlink(`./files/${req.params.filename}`, (err, data) => {
    res.redirect("/")
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})