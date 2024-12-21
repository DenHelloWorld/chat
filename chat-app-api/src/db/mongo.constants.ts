import 'dotenv/config';

export const MONGO_URI = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.kewo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;
