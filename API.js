const cors = require('cors');
const bodyParser = require('body-parser');
const Express = require('express');

const port = process.env.PORT || 9000;
const app = Express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//app.get('/', (req, res) => {
//    res.send({message: 'App is running on port 3000'});
//});

app.use('/api/v1', require('./api/v1'));
app.use(require('./controllers/AuthController'));
app.use(require('./controllers/UserAuthController'));

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
