const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = req.url === "/"
        ? path.join(__dirname, "index.html")
        : path.join(__dirname, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("404 - Archivo no encontrado");
            return;
        }

        const ext = path.extname(filePath);

        const contentTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg"
        };

        res.writeHead(200, {
            "Content-Type": contentTypes[ext] || "text/plain"
        });

        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});