const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields'); 
const { isValidRole, emailExist, userIdExist } = require('../helpers/db-validators');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/user');
const Role = require('../models/role');
const router = Router();

router.get('/', usersGet);

router.put('/:id',
[
    check('id','Not is a valid id').isMongoId(),
    check('id').custom( userIdExist ), 
    validateFields
],  
usersPut);

router.post('/',[    
    check('name','Name is required').notEmpty(),
    check('password','Password is required, min 6 lenght').isLength({min:6}),
    //check('email','Email is not valid').isEmail(),
    check('email').custom(emailExist),
    check('role').custom( isValidRole ),
    //check('role','Not is a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
], usersPost );

router.delete('/:id', 
[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userIdExist ),
    validateFields
], usersDelete );


module.exports = router;