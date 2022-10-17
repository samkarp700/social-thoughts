const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3005

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes

//mongoose database connect


//log mongo queries being executed. 