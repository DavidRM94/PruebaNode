//manejo de contraseñas
const bcrypt=require('bcryptjs');

export const encriptContra= async (contr)=>{
    //metodo para encriptar. parametros= numero de veces de aplicacion del encriptado,
    const encript= await bcrypt.genSalt(10);
    // aplicacion del encriptado a la contraseña
    return await  bcrypt.hash(contr,encript);
};

export const comparaContra= async (contrResiv,contr)=>{
    //Este metodo compara los dos parametros y devuelve un true si son iguales o false si son distintos
    return await bcrypt.compare(contrResiv,contr);

};