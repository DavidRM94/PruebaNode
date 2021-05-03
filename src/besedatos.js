//coneccion con base de datos

const mysql =require('mysql2');

const mysqlconect= mysql.createConnection({

    host:'mysqldb',
    user:'root',
    password:'contra', 
    database:'usuarios_gim'
});

mysqlconect.connect((err)=>{
    if(err){
        console.log("no se logueo");
        console.log(err);
        return 0;
    }else{
        console.log("Base conectada");
        return 1;
    }

});

module.exports=mysqlconect;
