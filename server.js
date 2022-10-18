const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3005

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use(require('./routes'));

//mongoose database connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/databasename', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries being executed. 
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost: ${PORT}`));

