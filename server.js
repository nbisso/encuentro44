const express = require("express")
const bodyParser = require("body-parser")
const server = express();

server.use(express.json())




server.get("/ruta/:id", (req, res) => {
    throw new Error("Error fatal")
    console.log(req.params)
    res.send("its me, server!")
})




server.get("/ruta/:id/test/:otroParam", (req, res) => {
    console.log(req.params)
    console.log(req.query)
    res.status(200)
    res.send()
})

server.post("/json", (req, res) => {
    console.log(req.body)
    res.status(200)
    res.send()
})

function log(req, res, next) {
    console.log("ruta es:" + req.path);
    if (!req.query.api_key) {
        res.status(403).send("no tenes el api key, :/")
    } else {
        next();
    }
}

function log2(req, res, next) {
    console.log("query params son:");
    console.log(req.query)
    req.pepito = "123"
    next();

}


server.use(log)
server.use(log2)


function validarQueryParamsPersona(req, res, next) {
    console.log(req.query)
    let cantidad = req.query.cantidad;
    let nombre = req.query.nombre;

    if (!cantidad) {
        res.status(400).send("no se encuentra la cantidad")
        return;
    }

    if (!nombre) {
        res.status(400).send("no se encuentra el nombre")
        return;
    }

    next();
}

let personas = ["pedro", "juan", "jose", "jhoana"]

server.get("/personas", validarQueryParamsPersona, (req, res, next) => {
    console.log(req.pepito)
    let cantidad = req.query.cantidad;
    let nombre = req.query.nombre;

    let result = personas.filter(persona => persona.includes(nombre)).slice(0, Number(cantidad));
    res.json(result)

    console.log("persona termina aca")
})

server.post("/personas", (req, res, next) => {
    personas.push("nuevo")
    res.send("ok")
})


server.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    res.status(500);
    res.send("error en la aplicacion :D asfas")
})

server.listen(3000, () => {
    console.log("server on")
})



