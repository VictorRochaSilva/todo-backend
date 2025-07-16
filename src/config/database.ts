import mongoose from 'mongoose';

export class Database {
    private mongoUri: string;
    private isConnected = false;

    constructor(mongoUri: string) {
        this.mongoUri = mongoUri;
        this.setupListeners();
    }

    private setupListeners() {
        mongoose.connection.on('connected', () => {
            console.log('🔗 MongoDB conectado');
            this.isConnected = true;
        });

        mongoose.connection.on('disconnected', async () => {
            console.warn('⚠️ MongoDB desconectado, tentando reconectar...');
            this.isConnected = false;
            try {
                await mongoose.connect(this.mongoUri);
            } catch (err) {
                console.error('❌ Falha ao reconectar MongoDB:', err);
                setTimeout(() => mongoose.connection.emit('disconnected'), 5000);
            }
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Erro MongoDB:', err);
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🔒 Conexão MongoDB fechada pelo processo');
            process.exit(0);
        });
    }

    public async connect(dbName = 'admin'): Promise<void> {
        if (this.isConnected && mongoose.connection.readyState === 1) {
            console.log('✅ MongoDB já conectado (cache)');
            return;
        }

        try {
            await mongoose.connect(this.mongoUri, {
                dbName,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            // isConnected atualizado no listener
        } catch (error) {
            console.error('❌ Falha ao conectar MongoDB:', error);
            process.exit(1);
        }
    }
}
