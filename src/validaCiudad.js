//validaciones de ciudades y sedes
const mysqlconexion=require('./besedatos');

export const verificaCiudad=async (req,res,next)=>{//Verifica si el id de ciudad existe
    const {idciudad}=req.body;
    
    mysqlconexion.query('SELECT * FROM ciudades WHERE id = ?',[idciudad],(err,rows,fields)=>{
        if(!err){
            if(rows.length>0){
                console.log(rows[0]);
                next();
            }else{
                res.json("no se encontro la ciudad");
            }
        }else{
            res.json(err);
        }
    });
}

export const verificaSede=async (req,res,next)=>{//verifica si el nombre de la sede existe
    const {sede,tipoUsu}=req.body;
    if(tipoUsu=="norm"){
        mysqlconexion.query('SELECT * FROM sedes WHERE nombresede = ?',[sede],(err,rows,fields)=>{
            if(!err){
                if(rows.length>0){
                    console.log(rows[0]);
                    next();
                }else{
                    res.json("no se encontro la sede");
                }
            }else{
                res.json(err);
            }
        });
    }else{
        next();
    }
    
}

export const verificaSedeReg=async (req,res,next)=>{//verifica si la sede ya esta registrada
    const {nombresede}=req.body;
    
    mysqlconexion.query('SELECT * FROM sedes WHERE nombresede = ?',[nombresede],(err,rows,fields)=>{
        if(!err){
            if(rows.length==0){
                next();
            }else{
                res.json("Ya se encuentra una sede con el mismo nombre");
            }
        }else{
            res.json(err);
        }
    });
}

export const verificaCiudadNom=async (req,res,next)=>{//verifica si el nombre de la ciudad existe
    const {ciudad,tipoUsu}=req.body;
    if(tipoUsu=="norm"){
        mysqlconexion.query('SELECT * FROM ciudades WHERE ciudad = ?',[ciudad],(err,rows,fields)=>{
            if(!err){
                if(rows.length>0){
                    console.log(rows[0]);
                    next();
                }else{
                    res.json("no se encontro la ciudad");
                }
            }else{
                res.json(err);
            }
        });
    }else{
        next();
    }
    
}

export const verificaCiudadReg=async (req,res,next)=>{//verifica si la ciudad no esta registrada
    const {ciudad}=req.body;
    
    mysqlconexion.query('SELECT * FROM ciudades WHERE ciudad = ?',[ciudad],(err,rows,fields)=>{
        if(!err){
            if(rows.length==0){
                next();
            }else{
                res.json("Ya se encuentra registrada una ciudad con ese nombre");
            }
        }else{
            res.json(err);
        }
    });
}