import express from "express";
import cors from "cors";
import controllerUsuarios from "./controllers/controller.usuarios.js";
import controllerMercados from "./controllers/controller.mercados.js";
import BasicAuth from "./config/basic-auth.js";
const app = express();


app.use(express.json());
//Middleare Cors
app.use(cors());


/*
for (var i=0; i<10; i++){
    console.log(i);
};
*/

app.use(BasicAuth);

app.use(controllerUsuarios);
app.use(controllerMercados);


app.listen(3000, function(){
    console.log('Servidor no ar...!');
});

