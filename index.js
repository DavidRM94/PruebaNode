
//arranque de servidor
const express=require('express');
const morgan=require('morgan');

const App=express();
App.use(express.json());
App.use(morgan('dev'));
App.use('/base',require('./src/rutas/index'));




App.set('port',process.env.PORT || 3000);

App.listen(App.get('port'),()=>console.log('servidor en puerto 3000'));

module.exports=App;