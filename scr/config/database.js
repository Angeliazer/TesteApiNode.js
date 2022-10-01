import mysql from "mysql";

//Conexão com o Banco de Dados MySQL
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rigon216#",
    database:"meu_mercado",
    port :3306
});




/*
connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
      if (error) {
        return connection.rollback(function() {
          throw error;
        });
      }
  
      var log = 'Post ' + results.insertId + ' added';
  
      connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
        });
      });
    });
  });*/
/*
  async function executeQueryTrx(transaction, ssql, parameters){

    return new Promise(function (resolve, reject) {
        transaction.query(ssql, parameters, function(err, result){
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}*/


/*
app.post("/pedidos", function(req, res){

    firebird.attach(dbOptions, function(err, db) {

        if (err) {
            return res.status(500).json(err);
        }

        db.transaction(firebird.ISOLATION_READ_COMMITED, async function(err, transaction){
            if (err) {
                return res.status(500).json(err);
            }

            try {
                let ssql = "insert into tab_pedido(id_cliente, valor) values(?, ?) returning id_pedido";

                // Grava o pedido...
                let ret = await executeQueryTrx(transaction, ssql, [req.body.id_cliente,
                                        req.body.valor]);
                let id_pedido = ret.id_pedido;


                // Grava os itens...
                for (var i = 0; i < req.body.itens.length; i++){
                    ssql = "insert into tab_pedido_item(id_pedido, id_produto, qtd, valor_unit, valor_total) values(?, ?, ?, ?, ?)";
                    await executeQueryTrx(transaction, ssql, [id_pedido, req.body.itens[i].id_produto, 
                                            req.body.itens[i].qtd, req.body.itens[i].valor_unit, 
                                            req.body.itens[i].valor_total]);
                                            
                }

                // Commit...
                transaction.commit(function(err){
                    if (err){
                        transaction.rollback();
                        res.status(500).json(err);
                    } else {
                        res.status(201).json({id_pedido: id_pedido});                        
                    }
                });

            } catch (error){
                transaction.rollback();
                res.status(500).json(error);
            }

            db.detach();
        });
    });

});  */


        

export default db;