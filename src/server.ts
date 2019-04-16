import express = require("express");
import Dao from './dao';
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
    res.send(Dao.getTamanhos());
});

app.get('/sabores/:id', function(req, res, next) {
    res.send(Dao.getSabores(req.params.id));
});

app.get('/cidades', function(req, res) {
    res.send(Dao.getCidades());
});

app.get('/bairros/:id', function(req, res) {
    res.send(Dao.getBairros(req.params.id));
});

app.post('/logon', function(req, res){

    var userName = req.body.userName;
    var password = req.body.password;

    if (userName === "luquinhas" && password === "1234") {
         console.log("User:"+userName+", Password:"+password);
         res.send({success : true, message: 'authentication succeeded' });
    }
    else { 
        res.send({success : false, message: 'authentication failed'});
    }
});
