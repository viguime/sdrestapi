const express = require("express");

const app = express();

const porta = process.env.PORT || 3333;

/** 
 * 
Requisitos:

* Listar o cardápio de lanches
* Cadastrar um novo item no cardápio
* Excluir um item do cardápio
* Montar um pedido
* Solicitar a entrega
* Consultar os pedidos

**/




const bd = [
    {
        nome: "Calabresa",
        preco: 15.0,
    },
    {
        nome: "Carne de Sol",
        preco: 20.0,
    },
    {
        nome: "Frango com Catupiry",
        preco: 10.0,
    },
    {
        nome: "Portuguesa",
        preco: 18.0,
    },
];

const pd =[];

const ship =[];

app.use(express.json());

app.use(express.static(process.env.PWD + "/public"));

app.get("/pizza/cardapio", (req, res) => {
    res.send(bd);
});

app.get("/pedidos", (req, res) => {
    res.send(pd);
});

app.get("/entregas", (req, res) => {
    res.send(ship);
});

app.get("/pizza/cardapio/:idpizza", (req, res) => {
    const idPizza = req.params.idpizza;

    if (idPizza >= 0 && idPizza < bd.length) {
        res.send(bd[idPizza]);
    } else {
        res.status(404).send();
    }
});

app.post("/pizza/cadastro", (req, res) => {
    const pizza = req.body;

    bd.push(pizza);
    res.send({ result: "OK" });
});

app.post("/pedido/cadastro", (req, res) => {

    const idorder = req.body;
    const order = [];
    var check = true;

    for(var i = 0; i >= 0 && i < idorder.length; i++){
        check = bd[idorder[i]]
        }
    
    if(check){
        for(var i = 0; i >= 0 && i < idorder.length; i++){
        order[i] = bd[idorder[i]]
        };

        pd.push(order)
        console.log(idorder)

        res.send({ result: "OK" });

    }else{
        res.status(400).json();
    }
});

app.put('/pedidos/:idpedido', (req, res) => {
    const idPedido = req.params.idpedido;

    if (idPedido >= 0 && idPedido < pd.length) {
        ship.push(pd[idPedido]);
        pd.splice(idPedido, 1);
    } else {
        res.status(404).send();
    }

    return res.status(204).json();
});


app.post("/pedidos", (req, res) => {
    const order = req.body;
    pd.push(order);
    res.send({ result: "OK" });
});

app.put('/pizza/cardapio/:idpizza', (req, res) => {
    const idPizza = req.params.idpizza;
    const {nome,preco} = req.body;

    const pizza = {
        nome,
        preco
    };

    if (idPizza >= 0 && idPizza < bd.length) {
        bd[idPizza] = pizza;
    } else {
        res.status(404).send();
    }

    return res.json(pizza);
});

app.delete('/pizza/cardapio/:idpizza', (req, res) => {
    const idPizza = req.params.idpizza;

    if (idPizza >= 0 && idPizza < bd.length) {
        bd.splice(idPizza, 1);
    } else {
        res.status(404).send();
    }

    return res.status(204).json();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(porta, () => {
    console.log('Express server listening on port', porta);
});