const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3004;
const HOST = '10.1.16.74';
const API_SERVICE_URL = "http://ngsst-loadb-16mh0sxownmqp-1251916990.ap-northeast-1.elb.amazonaws.com/";

app.use(cors())
// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
});

// Proxy endpoints
app.use('/test', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/test`]: '',
    }
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});