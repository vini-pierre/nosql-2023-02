var express = require('express')
var app = express()

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.status(200).send('Ok');
})

app.listen(5000, () => {
    console.log('Servidor iniciado porta 5000')
});

