const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;


const app = express();
const SECRET_KEY = 'super-secret-key';


app.use(cors());
app.use(bodyParser.json());


const user = {
    id: 1,
    username: 'deathscythe',
    password: 'something' 
};


app.post('/login', (req, res) => {
    const { username, password } =  req.body;
    if(username === user.username && password === user.password){
        const token = jwt.sign({id: user.id, username: user.username, password: user.password}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    }else{
        res.status(401).json({message: 'Invalid credentials!'});
    }
});

app.listen(PORT, () => {
    console.log(`Vibing on port ${PORT}`);
})
