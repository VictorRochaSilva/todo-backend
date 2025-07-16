import mongoose from 'mongoose';

const mongoUri = "mongodb://admin:senha123@mongodb:27017/?authSource=admin";

export default async function connectMongo() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(mongoUri, { dbName: "admin" });
        console.log("✅ Conectado ao MongoDB!");
    } catch (err) {
        console.error("❌ Erro ao conectar no MongoDB:", err);
        process.exit(1); // força o app a parar se não conectar
    }
}
