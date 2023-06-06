const express = require('express');
const cors = require('cors');


class Server{

    constructor(){  

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    }

    routes(){   

       this.app.use(this.usersPath, require('../routes/user'));

    }

    listen(){
    
        this.app.listen(this.port, () => {
            console.log(`Example app listening at port ${this.port} `);
        });

    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Reading and parsing of the body
        this.app.use( express.json());


        // Directorio público
        this.app.use( express.static('public') );        
        
    }

}


module.exports = Server;