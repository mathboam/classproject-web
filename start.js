const app = require('./app');
const mongoose = require('mongoose');
const router = require('./routes/index');
mongoose.Promise = global.Promise; //tell mongoose to use es6 syntax

// import the environmental variables
require('dotenv').config({path:'.env'})



// start mongoose and connect to database 
mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    console.log("connected");
}).catch(err =>{
    console.log(err);
});


// start express server and a listener
app.set('port',process.env.PORT || 5000);
const server = app.listen(app.get('port'),() => {
    console.log(`Express is running on port ${server.address().port}`);
});

app.use(router);

