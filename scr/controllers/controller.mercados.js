import Router  from "express";
import db from "../config/database.js";


const controllerMercados = Router();

controllerMercados.get("/mercados", function(request, response){
    let sql = "Select * from mercado where id_mercado > 0";

    let filtro = [];

    if (request.query.busca) {
        sql += " and nome = ?";
        filtro.push(request.query.busca);
    }

    if (request.query.ind_entrega) {
        sql += " and ind_entrega = ?"
        filtro.push(request.query.ind_entrega);
    }

    if (request.query.ind_retira) {
        sql += " and ind_retira = ?"
        filtro.push(request.query.ind_retira);
    }

    db.query(sql, filtro, function (erro, resultado){
       if (erro){
          return response.status(500).send(erro);
       } else {
          return response.status(200).json(resultado);  
       } 

    });
});

controllerMercados.get("/mercados/:id_mercado", function(request, response){
    let sql = "Select * from mercado where id_mercado = ?";
    let id = request.params.id_mercado;
    db.query(sql, [id], function (erro, resultado){
       if (erro){
          return response.status(500).send(erro);
       } else {
          return response.status(resultado.length > 0 ? 200: 404).json(resultado);  
       } 

    });
});

export default controllerMercados;