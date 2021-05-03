const peticiones=require('supertest');
const App=require('../index');

it("Devolvera todos los usuarios registrados",done=>{
    peticiones(App)
        .get('/base/consultaUsu')
        .set('Accept', 'application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
});