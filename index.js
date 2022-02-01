const express = require('express');
const Database = require('./mysqlcon');
var cors = require('cors')
const port = 3001;
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Servidor ok ');
})
app.get('/marca', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM vehiculos', [],
        function (err, results, fields) {
            res.json(results)
        }
    );
})
app.get('/usuario', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM Usuario', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})
app.post('/marcas', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO vehiculos   
                (idmarca, Marca, Modelo, Pais_de_origen, Cilindraje,Año_de_origen,imagen) VALUES
                 (?,?,?,?,?,?,?)`;

    cn.execute(
        query, [body.idmarca, body.Marca, body.Modelo, body.Pais_de_origen, body.Cilindraje,body.Año_de_origen,body.imagen],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})
//TABLA USUARIO//
app.post('/usuario', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO Usuario 
                (id,username, password, status) VALUES
                 (?,?,?,?)`;

    cn.execute(
        query, [body.username, body.password, body.status],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );



})

app.post('/marca', (req, res) => {
    const body = req.body;
    res.json(body);
    
})

app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})