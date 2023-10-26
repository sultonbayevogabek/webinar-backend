import { readdir } from 'fs';
import { join } from 'path';
import express from 'express';
import config from './config.js';
import cors from 'cors';

const app = express();

app.use(express.static(join('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ["http://www.example.com", "http://127.0.0.1:5500"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

readdir('routes', (err, files) => {
    files.forEach(async file => {
        const routing = (await import('./routes/' + file)).default;
        app.use(routing.route, routing.router);
    });
});

app.listen(config.PORT, () => {
    console.log('SERVER RUNNING ON: http://localhost:' + config.PORT);
});
