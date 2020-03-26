const express =  require('express');
const cors =  require('cors');
const route = require('./routes')
const app =  express();

app.use(cors({origin:'http://localhost:3333/'}));
app.use(express.json());
app.use(route);


app.listen(3333);