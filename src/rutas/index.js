// Endpoint's


const express=require('express');
//const mysql =require('mysql2');
const Router=express.Router();
const bcry=require('../encripta');
const jwt=require('jsonwebtoken');
const config=require('../config');
const verifToken=require('../validaToken');
const valdCiu=require('../validaCiudad');
const valdReg=require('../validaReg');

const mysqlconexion=require('../besedatos');

//let mysqlconexion;

/*
const mysqlconect= {
    host:'mysqldb',
    user:'root',
    password:'contra', 
    database:'usuarios_gim'
};

Router.get('/conexion',async(req,res)=>{
    mysqlconexion= mysql.createConnection(mysqlconect);
    await mysqlconexion.connect((err)=>{
        if(err){
            console.log("no se logueo");
            console.log(err);
        }else{
            res.json("Base conectada");
        }
    });
});
*/

Router.get('/creatablaUsu',async(req,res)=>{
    
    const sentenciaSql=`CREATE TABLE IF NOT EXISTS usuarios (
        id int(255) not null auto_increment,
        name varchar(45) default null,
        ciudad varchar(20) default null,
        sede varchar(20) default null,
        tipoUsu varchar(20) default null,
        contrasena varchar(300) default null,
        primary key(id) );`;
    mysqlconexion.query(sentenciaSql,(err)=>{
        if(!err){
            res.json("Tabla usuarios creada");
        }else{
            console.log("No se creo la tabla usuarios"); 
            res.json("No se creo la tabla usuarios");
        }
    });
});
Router.get('/creatablaCiu',async(req,res)=>{

    
    const sentenciaSql=`CREATE TABLE IF NOT EXISTS ciudades (
        id int(255),
        ciudad varchar(50),
        primary key(id));`;
    mysqlconexion.query(sentenciaSql,(err)=>{
        if(!err){
            res.json("Tabla ciudades creada");
        }else{
            console.log("No se creo la tabla ciudades"); 
            res.json("No se creo la tabla ciudades");
        }
    });
});
Router.get('/creatablasSedes',async(req,res)=>{
    const sentenciaSql=`CREATE TABLE IF NOT EXISTS sedes (
        id int(255),
        nombresede varchar(50),
        idciudad int(255),
        primary key(id));`;
    
    mysqlconexion.query(sentenciaSql,(err)=>{
        if(!err){
            res.json("Tabla sedes creada");
        }else{
            console.log("No se creo la tabla sedes"); 
            res.json("No se creo la tabla sedes");
        }
    });
});

Router.get('/consultaUsu',[verifToken.verificaToken],(req,res)=>{ //Consulta todos los usuarios registrados
    mysqlconexion.query('SELECT * FROM usuarios', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
            res.json([]);
        }

    });
    
});
Router.get('/consultaCiu',[verifToken.verificaToken],(req,res)=>{ //consulta todas las ciudades registradas
    mysqlconexion.query('SELECT * FROM ciudades', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
            res.json([]);
        }

    });
    
});

Router.delete('/elimCiu',[verifToken.verificaToken],(req,res)=>{//Elimina ciudades por su id
    const {id}=req.body;
    try{
        if(id.length>0){
            for(let i=0;i<id.length;i++){
                mysqlconexion.query('DELETE FROM ciudades WHERE id = ? ' ,[id[i]],(err)=>{
                    if(!err){
                        res.json("Ciudad eliminada");
                        
                    }else{
                        console.log(err); 
                        res.json("Ciudad no encontrada");
                    }
                });
            }
        }else{
            res.json("Ciudad no encontrada");
        }
    }catch{
        res.status(403).json("algo a salido mal");
    }

});

Router.get('/consultaSede',[verifToken.verificaToken],(req,res)=>{ //consulta todas las sedes registradas
    mysqlconexion.query('SELECT * FROM sedes', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
            res.json([]);
        }

    });
    
});

Router.delete('/elimSede',[verifToken.verificaToken],(req,res)=>{//Elimina sedes por su id
    const {id}=req.body;
    try{
        if(id.length>0){
            for(let i=0;i<id.length;i++){
                mysqlconexion.query('DELETE FROM sedes WHERE id = ? ' ,[id[i]],(err)=>{
                    if(!err){
                        res.json("Sede eliminada");
                        
                    }else{
                        console.log(err); 
                        res.json("sede no encontrada");
                    }
                });
            }
        }else{
            res.json("sede no encontrada");
        }
    }catch{
        res.status(403).json("algo a salido mal");
    }

});

Router.get('/consultaUsuId/:id',[verifToken.verificaToken],(req,res)=>{//consulta un usuario por su id
    const id=req.params.id;
    mysqlconexion.query('SELECT * FROM usuarios WHERE id = ?',[id], (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
            res.json([]);
        }

    });
    
});

Router.post('/regUsu',[valdReg.verificaReg,valdCiu.verificaCiudadNom,valdCiu.verificaSede,valdReg.verificaRegSede],async (req,res)=>{//registra usuarios
    console.log(req.body);
    const {id,name,ciudad,sede,tipoUsu,contrasena}=req.body;
    const contrasenaEncrip=await bcry.encriptContra(contrasena);
    mysqlconexion.query('INSERT INTO usuarios (id,name,ciudad,sede,tipoUsu,contrasena) VALUES (?,?,?,?,?,?)',[id,name,ciudad,sede,tipoUsu,contrasenaEncrip],(err,rows,fields)=>{
        if(!err){
            res.json("Usuario registrado");
        }else{
            res.json("Usuario no registrado");
        }
    })

});

Router.post('/regCiu',[verifToken.verificaToken,valdCiu.verificaCiudadReg],(req,res)=>{//registra ciudades
    try{

        console.log(req.body);
        const {id,ciudad}=req.body;
        mysqlconexion.query('INSERT INTO ciudades (id,ciudad) VALUES (?,?)',[id,ciudad],(err,rows,fields)=>{
            if(!err){
                res.json("Ciudad registrada");
            }else{
                res.json("Ciudad no registrada");
            }
        });
    }catch{
        return res.status(403).json("algo a salido mal");
    }

});

Router.post('/regSede',[verifToken.verificaToken,valdCiu.verificaCiudad,valdCiu.verificaSedeReg],async (req,res)=>{//registra sedes
    const {id,nombresede,idciudad}=req.body;
    

    mysqlconexion.query('INSERT INTO sedes (id,nombresede,idciudad) VALUES (?,?,?)',[id,nombresede,idciudad],(err,rows,fields)=>{
        if(!err){
            res.json("Sede registrada");
        }else{
            res.json("Sede no registrada");
        }
    });
});

Router.post('/sigin', async (req,res)=>{//inicio de secion
    const {name,contrasena}=req.body;
    await mysqlconexion.query('SELECT * FROM usuarios WHERE name = ?',[name],async (err,rows,fields)=>{
        if(!err){
            if(rows.length>0){
                const usuValido= await bcry.comparaContra(contrasena,rows[0].contrasena);
                if(usuValido){
                    let token="";
                    if(rows[0].tipoUsu=="admin"){
                        
                        token=jwt.sign({idusu:rows[0].id},config.default.SECRET,{
                            expiresIn:86400 //tiempo de expiracion esta en segundos
                        });
                        res.json(token);

                    }else{
                        res.json("no tiene los permisos para loguearse");
                    }

                }else{
                    res.json("Contraseña incorrecta");
                }
            }else{
                res.json("Usuario invalido");
            }
        }else{
            console.log(err); 
            res.json("error al consultar la base de datos");
        }

    });
});

Router.post('/consRegSede',[verifToken.verificaToken],(req,res)=>{//Consulta de usuarios por sede y ciudad
    const {sede,ciudad}=req.body;
    
    mysqlconexion.query('SELECT id,name FROM usuarios WHERE sede = ? AND ciudad = ? AND tipoUsu = "norm"' ,[sede,ciudad],(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.json(rows);
        }else{
            res.json(err);
        }
    });

});

Router.delete('/elimUsu',[verifToken.verificaToken],(req,res)=>{//elimina usuario
    const {id}=req.body;
    try{
        if(id.length>0){
            for(let i=0;i<id.length;i++){
                mysqlconexion.query('DELETE FROM usuarios WHERE id = ? ' ,[id[i]]);
            }
        }
        
        res.json("usuarios eliminados");
    }catch{
        res.status(403).json("algo a salido mal");
    }

});

Router.post('/encript',async (req,res)=>{//encripta cadena de texto
    console.log(req.body);
    const {contrasena}=req.body;
    const encript=await bcry.encriptContra(contrasena);
    res.json(encript);
});
Router.post('/comparacontr',async (req,res)=>{//compara cadena encriptada con una cadena sin encriptar
    console.log(req.body);
    const {contrasena,contrasena0}=req.body;
    const encript=await bcry.comparaContra(contrasena,contrasena0);
    res.json(encript);
});


module.exports=Router;