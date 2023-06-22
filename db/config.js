const mongoose = require('mongoose');


const dbConnect = async() => {

    try{
       await mongoose.connect( process.env.MONGODB_CNN , {
     /*   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true */
       });
       console.log('DB Online');

    }
    catch(error){
        throw new Error('Error a la hora de iniciar la BD ver logs');
        console.log(error);
    }


}


module.exports = {
    dbConnect
}
