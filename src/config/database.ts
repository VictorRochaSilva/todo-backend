import mongoose from 'mongoose';

export class Database {
    private mongoUri: string;
    private isConnected: boolean = false;

    constructor(mongoUri: string) {
        this.mongoUri = mongoUri;
    }

    public async connect(dbName: string = 'admin'): Promise<void> {
        if (this.isConnected || mongoose.connection.readyState >= 1) {
            console.log('✅ MongoDB já conectado.');
            this.isConnected = true;
            return;
        }

        try {
            await mongoose.connect(this.mongoUri, { dbName });
            this.isConnected = true;
            console.log('✅ Conectado ao MongoDB!');
        } catch (error) {
            console.error('❌ Erro ao conectar no MongoDB:', error);
            process.exit(1);
        }
    }
}
