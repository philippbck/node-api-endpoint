const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log('Port 4444 works!');
});


app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.post('/api/v1', (req,res) => {
    var data = req.body;

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
        user: '<username>',
        pass: '<password>'
    }
});

var mailOptions = {
    from: data.email,
    to: '<targetMailAddress>',
    subject: 'Test Mail',
    html: `<p>${data.name}</p>
        <p>${data.email}</p>
        <p>${data.message}</p>`
};

smtpTransport.sendMail(mailOptions,
(error, response) => {
    if(error) {
        res.send(error)
    }else {
        res.send('Success')
    }
    smtpTransport.close();
});

})
