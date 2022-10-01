import auth from "basic-auth";

function BasicAuth(req, res, next){
    const user = auth(req);
    const username = "rigon";
    const password = "Rigon216";

    if (user && user.name.toLowerCase() === username.toLowerCase() &&
       user.pass === password) {
        next();
       } else {
        res.status(401).send("Acesso negado....!");
       }

}

export default BasicAuth;