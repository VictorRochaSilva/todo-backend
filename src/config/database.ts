import mongoose from 'mongoose';

const mongoUri = "mongodb://admin:senha123@mongodb:27017/?authSource=admin";

async function connectMongo() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(mongoUri, { dbName: "admin" });
        console.log("✅ Conectado ao MongoDB!");
    } catch (err) {
        console.error("❌ Erro ao conectar no MongoDB:", err);
    }
}

connectMongo();
