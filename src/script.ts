import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const app: express.Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: express.Request, res: express.Response)=>{
    res.sendFile(path.join(__dirname,'..','public', 'index.html'));
})

app.listen(3000, ()=>{console.log("ref_first_example is listening at port 3000...")})