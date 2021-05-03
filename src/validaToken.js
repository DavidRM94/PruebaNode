//validad las seciones de los usuarios
const jwt=require('jsonwebtoken');
const config=require('./config');
const mysqlconexion=require('./besedatos');

export const verificaToken=async (req,res,next)=>{
    
    try{
        const tokenEnv= req.headers["x-access-token"];
        if(!tokenEnv){//si no se envio token
            return  res.status(403).json("No esta logueado");//devuelve mensaje de error y se sale de la peticion
        }

        const infToken=await jwt.verify(tokenEnv,config.default.SECRET);// en el token viene el id del usuario
        mysqlconexion.query('SELECT * FROM usuarios WHERE id = ?',[infToken.idusu], (err,rows,fields)=>{
            if(!err){
                if(rows.length>0){
                    if(rows[0].tipoUsu=="admin"){
                        next();
                    }else{
                        return res.json("El usuario no es admin");
                    }
                }else{
                    return res.json("No se encuentra usuario");
                }
            }else{
                console.log(err); 
                return res.status(403).json("algo a salido mal");
            }
    
        });

    }catch (e){
        return res.status(403).json(e);
    }
    
}