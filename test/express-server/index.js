const express = require('express');
const expressChromeDebug = require('../../index');
const hbs = require('hbs');

const app = express();
app.engine('html', hbs.__express);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'html');
app.set('view options', { layout: 'layouts/main' });

// Add the plugin were testing
app.use(expressChromeDebug({
    secretKey: '12345'
}));

app.get('/', function (req, res) {
    setTimeout(() => {
        res.render('home', {
            message: 'Hello World',
        });
    }, 100); // For testing purposes add a 100ms delay
});

app.listen(3000, () => console.log('listening on port 3000!'));