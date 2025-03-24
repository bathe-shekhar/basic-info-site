const { createServer } = require('http');
const fs = require('node:fs/promises');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

server = createServer(async (req, res) => {


    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    let filePath;
    let statusCode;

    switch (pathname) {
        case '/':
            statusCode = 200;
            filePath = path.join(__dirname, 'pages', 'index.html');
            break;
        case '/about':
            statusCode = 200;
            filePath = path.join(__dirname, 'pages', 'about.html');
            break;
        case '/contact-me':
            statusCode = 200;
            filePath = path.join(__dirname, 'pages', 'contact-me.html');
            break;
        default:
            statusCode = 404;
            filePath = path.join(__dirname, 'pages', '404.html');
            break;
    }

    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(statusCode);

        // res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    } catch (error) {
        console.error('Error serving page:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})