const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const ExistRole = await Role.findOne({ role });
    if(!ExistRole){
        throw new Error(`Role ${role} is not registered in database`);
    } 
}

const emailExist = async(email = '') => {

    const emailExist = await User.findOne({ email });
    if( emailExist ){
        throw new Error(`Email ${email} is already exist in database`);
    }

}

const userIdExist = async ( _id ) => { 

    const userExist = await User.findOne({ _id });    
    if( !userExist ){
        throw new Error(`UserId ${id} is not found in database`);
    }
}
   




module.exports = {
    isValidRole,
    emailExist,
    userIdExist
}