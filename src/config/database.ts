import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI as string;

console.log(mongoUri);

if (!mongoUri) {
    console.error("MONGODB_URI não definida no .env");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((err) => console.error("Erro ao conectar no MongoDB:", err));
