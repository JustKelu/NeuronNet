import 'dotenv/config';

import cors from 'cors';
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

import chatHandler from "./routes/chat.js";

app.use(cors())
app.use(express.json());
app.use("/api/ai", chatHandler);

app.get('/', (req, res) => {
	res.json({message: "Hello world"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    console.log('Server is running... (Ctrl+C to stop)');
}).on('error', (err) => {
    console.error('❌ Server error:', err);
});