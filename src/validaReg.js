//validacion de usuarios
const mysqlconexion=require('./besedatos');

export const verificaReg=async (req,res,next)=>{//Verifica que el usuario no este registrado
    const {id}=req.body;
    
    mysqlconexion.query('SELECT * FROM usuarios WHERE id = ?',[id],(err,rows,fields)=>{
        if(!err){
            if(rows.length==0){
                console.log("usuario nuevo");
                next();
            }else{
                res.json("Ya esta registrado");
            }
        }else{
            res.json(err);
        }
    });

}

export const verificaRegSede=async (req,res,next)=>{//verifica  que en la sede tenga menos de 300 usuarios registrados
    const {sede,ciudad,tipoUsu}=req.body;
    if(tipoUsu=="norm"){
        mysqlconexion.query('SELECT * FROM usuarios WHERE sede = ? AND ciudad = ? AND tipoUsu = "norm"',[sede,ciudad],(err,rows,fields)=>{
            if(!err){
                if(rows.length<300){
                    console.log("Registrados en la sede " + sede + " de la ciudad " + ciudad + ": " + rows.length);
                    next();
                }else{
                    res.json("Ya se tienen 300 usuarios registrados en esta sede");
                }
            }else{
                res.json(err);
            }
        });
    }else{
        next();
    }
    

}