const mongoose = require('mongoose');
const mongodbConnectionUrl = config.DB_URL;

mongoose.connect(mongodbConnectionUrl, { useNewUrlParser: true }, (err) => {
    if (!err) 
        console.log('MongoDB Connection Succeeded.')
    else
        console.log('Error in DB connection : ' + err);
});

require('./user.model');