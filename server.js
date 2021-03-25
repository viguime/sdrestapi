const express = require("express");

const app = express();

const porta = process.env.PORT || 3333;

/** 
 * 
Requisitos:

Listar o cardápio de lanches
Cadastrar um novo item no cardápio
Excluir um item do cardápio
Montar um pedido
Solicitar a entrega
Consultar os pedidos

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

app.use(express.json());

app.use(express.static(process.env.PWD + "/public"));

app.get("/pizza/cardapio", (req, res) => {
    res.send(bd);
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

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(porta, () => {
    console.log("Servidor up and running!");
});