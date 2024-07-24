import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// __filename과 __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, './public')));
app.use('/src', express.static(path.join(__dirname, './src')));

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
