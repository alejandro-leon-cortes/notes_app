const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('Db is connected')).catch(error => console.error(err));

