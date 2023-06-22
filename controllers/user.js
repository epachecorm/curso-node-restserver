const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    //const {q, name, apikey, page, limit} = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = {status:true};

    //const users = await User.find( query )
    //        .skip(Number(from))
    //        .limit(Number(limit));

    //const total = await User.countDocuments( query );

    const [total,users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(Number(from))
            .limit(Number(limit))
        
    ]);

    res.json(
        {   total,                
            users
        }        
        );
}
const usersPut = async (req, res = response) => {

    const { id }= req.params;
    const { _id, password, google, email, ...rest} = req.body; 

    

    if (password){
        const salt = bcryptjs.genSaltSync(); 
        rest.password = bcryptjs.hashSync(password, salt);
    }

    //console.log(id); 
    //console.log(rest); 

    const user = await User.findByIdAndUpdate( id, rest ); 

    if(!user){
        console.log(`User with id ${ id } not found`);
    }
 
    res.json(
        {                
            "msg": "put API - controller",
            user
        }
        );
}
const usersPost = async(req, res = response) => {    

    const body = req.body;

    const {name, email, password, img,  role, status, google} = req.body;
    const user = new User({name, email, password, img,  role, status, google});       


    //Encrypt password

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    //
    await user.save();

    res.json(
        {
            "msg": "post API - controller",
            user
        }
        );
}
const usersDelete = async(req, res = response) => {

    const { id }= req.params;
    //Delete physically
    //const deletedUser = await User.findByIdAndDelete(id);

    const deletedUser = await User.findByIdAndUpdate( id, { status: false } );

    res.json({
        deletedUser
        });
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}