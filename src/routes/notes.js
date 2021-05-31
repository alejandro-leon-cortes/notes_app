const router = require('express').Router();
const Note = require('../models/note');

router.get('/notes', async (req,res) => {
    const notes = await Note.find({});
    const dataNotes = JSON.parse(JSON.stringify(notes));
    res.render('notes/show',{dataNotes});
})
router.get('/notes/new', (req,res) => {
    res.render('notes/new');
})
router.post('/notes/create', async (req,res) => {
    const {title,description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text:'Debe ingresar titulo'});
    }
    if(!description){
        errors.push({text:'Debe ingresar descripción'});
    }
    if(errors.length>0){
        res.render('notes/new',{errors,title,description});
    }else{
        const newNote = new Note({title,description})
        await newNote.save();
        req.flash('success_msg','Nota agregada correctamente.');
        res.redirect('/notes');
    }
})
router.get('/notes/edit/:id', async (req,res) => {
    const note = await Note.findById(req.params.id);
    const dataNote = JSON.parse(JSON.stringify(note));
    res.render('notes/edit',{dataNote});
})
router.put('/notes/update/:id', async (req,res) => {
    const {title,description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text:'Debe ingresar titulo'});
    }
    if(!description){
        errors.push({text:'Debe ingresar descripción'});
    }
    if(errors.length>0){
        res.render('notes/edit',{errors,title,description});
    }else{
        await Note.findByIdAndUpdate(req.params.id, {title,description});
        req.flash('success_msg','Nota actualizada correctamente.');
        res.redirect('/notes');
    }
})
router.delete('/notes/remove/:id', async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Nota eliminada correctamente.');
    res.redirect('/notes');
});

module.exports = router;