import express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const port: number = 3000;

app.listen(port, () => {
    console.log(`Server running in port http://localhost:${port}/`);
});

app.get('/tamanhos', function(req, res) {
    res.send([
        {
            id:1,
            name:"Pequeno",
            quantidade_sabores:1
        },
        {
            id:2,
            name:"Médio",
            quantidade_sabores:2
        },
        {   id:3,
            name:"Grande",
            quantidade_sabores:3
        }]
    );
});

app.get('/cidades', function(req, res) {
    res.send([
        {
            id:1,
            name:"Jaraguá do Sul",
        },
        {
            id:2,
            name:"Corupá",
        },
        {   id:3,
            name:"Guaramirim"
        }]
    );
});

app.post('/logon', function(req, res){
    var userName = req.body.user;
    var password = req.body.password;
    console.log("User name = "+userName+", password is "+password);
    res.end("yes");
  });
