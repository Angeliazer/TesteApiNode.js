import Router from "express";
import db from "../config/database.js";

const controllerUsuarios= Router();

controllerUsuarios.put("/usuarios/:id_usuario", function(request, response){
    let sql = "update usuario set nome=?, email=?, senha=?, endereco=?, bairro=?, cidade=?, uf=?, cep=? where id_usuario = ? ";
    const id = request.params.id_usuario;
    const body = request.body;
    db.query(sql, [body.nome,
                   body.email,
                   body.senha,
                   body.endereco,
                   body.bairro,
                   body.cidade,
                   body.uf,
                   body.cep,
                   id], function (erro, resultado){
       if (erro){
          return response.status(500).send(erro);
       } else {
          return response.status(200).json({id_usuario: id});  
       } 

    });
});

controllerUsuarios.get("/usuarios/:id_usuario", function(request, response){
    let sql = "Select * from usuario where id_usuario = ?";
    db.query(sql, [request.params.id_usuario], function (erro, resultado){
       if (erro){
          return response.status(500).send(erro);
       } else {
          return response.status(resultado.length > 0 ? 200: 404).json(resultado[0]);  
       } 

    });
});


controllerUsuarios.post("/usuarios/login", function(request, response){
    const body = request.body;
    let sql = "Select id_usuario, nome, email, date_format(dt_cadastro, '%d/%m/%Y') as dt_cadastro";
    sql += " from usuario where email = ? and senha = ?";

    //console.log(body.email);
    //console.log(body.senha);

    db.query(sql, [body.email, body.senha], function (erro, resultado){
       if (erro){
          throw response.status(500).send(erro);
       } else {
          return response.status(resultado.length > 0 ? 200: 401).json(resultado[0]);  
       } 

    });
});

//db.connect();

controllerUsuarios.post("/usuarios/cadastro", (request, response) =>{
   const body = request.body;
   let sql = "Insert into usuario (nome, email, senha, endereco, bairro, cidade, uf, cep, dt_cadastro) values ";
   sql  += " (?, ?, ?, ?, ?, ?, ?, ?, current_timeStamp())";
   db.query(sql, [body.nome,
                  body.email,
                  body.senha,
                  body.endereco,
                  body.bairro,
                  body.cidade,
                  body.uf,
                  body.cep], (erro, resultado) => {
      if (erro){
         return response.status(500).send(erro);
      } else {
         return response.status(201).json({id_usuario: resultado.insertId});  
      } 
   }); 
});

controllerUsuarios.post("/usuarios", function(request, response){
   db.beginTransaction(function(err, transaction) {
       if (err) { 
           throw err 
       }
       let sql = "Insert into usuario (nome, email, senha) values (?, ?, ?)"

      try {

       db.query(sql, [request.body.nome, request.body.email, request.body.senha], function (error, results) {
          let id = results.insertId;
           if (error) {
               return db.rollback(function() 
               {
                 throw response.status(500).json(error)
               }
            )}

            db.commit(function(err) {
               if (err) {
                 return connection.rollback(function() {
                   throw err
                 })}

               return response.status(201).json({id_usuario : results.insertId})
            }
         )
      })

   } catch (errpo){
      if (errpo)
          return (response.status(500).json('Erro......'))   

   }



   })
})     

export default controllerUsuarios;