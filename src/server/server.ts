import * as express from 'express';
import routes from './routes';
import * as path from "path";
import config from './config';

// console.log("")
// console.log(config.db.host);
// console.log(config.keys.api)
// console.log("")

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));