import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'tls';
import { AxiosError } from 'axios';

dotenv.config();

const connectDb = async(): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectionOptions);
        console.log('MongoDB Connected')
    } catch (err) {
        const error = err as AxiosError;
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;