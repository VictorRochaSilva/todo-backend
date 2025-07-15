import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongoUri = "mongodb://admin:senha123@mongodb:27017/todo?authSource=admin" as string;

console.log(mongoUri);

if (!mongoUri) {
    console.error("MONGODB_URI não definida no .env");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((err) => console.error("Erro ao conectar no MongoDB:", err));
