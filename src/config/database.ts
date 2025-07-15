import mongoose from 'mongoose';

const mongoUri = "mongodb://admin:senha123@mongodb:27017/admin?authSource=admin";

async function connectMongo() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(mongoUri);
        console.log("✅ Conectado ao MongoDB!");
    } catch (err) {
        console.error("❌ Erro ao conectar no MongoDB:", err);
    }
}

connectMongo();
