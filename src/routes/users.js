const router = require('express').Router();
const User = require('../models/user');

router.get('/users/signin', (req,res) => {
    res.render('users/signin');
})
router.get('/users/signup', (req,res) => {
    res.render('users/signup');
})
router.post('/users/signup', (req,res) => {
    const {name,email,password,confirm_password} = req.body;
    const errors = [];
    if(password!=confirm_password){
        errors.push({text:'La contraseña y su confirmación no coincide.'});
    }
    if(password.length<6){
        errors.push({text:'Debe ingresar una contraseña de al menos 6 caracteres.'});
    }
    if(name.length==0){
        errors.push({text:'Debe ingresar un nombre.'});
    }
    if(email.length==0){
        errors.push({text:'Debe ingresar un correo electrónico.'});
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        res.send('ok');
    }
})

module.exports = router;