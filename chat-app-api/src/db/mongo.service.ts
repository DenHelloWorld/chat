import mongoose, { Model, Document } from 'mongoose';
import { MongoErrorHandler } from '../utils/error-handlers';
import { MongoResponse } from './mongo.interfaces';
import 'dotenv/config';

class MongoService {
  private readonly uri: string;
  private readonly errorHandler = new MongoErrorHandler();

  constructor(uri: string) {
    this.uri = uri;
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  async create<T extends Document>(
    Model: Model<T>,
    data: Partial<T>,
  ): Promise<MongoResponse<T>> {
    try {
      const document = new Model(data);
      const savedDocument = await document.save();
      return {
        message: 'Document created successfully',
        payload: savedDocument,
      };
    } catch (error) {
      this.errorHandler.handleError(error);
      return { message: 'Failed to create document', payload: null };
    }
  }

  async getAll<T extends Document>(
    Model: Model<T>,
  ): Promise<MongoResponse<T[]>> {
    try {
      const documents = await Model.find();
      return {
        message: 'Documents retrieved successfully',
        payload: documents,
      };
    } catch (error) {
      this.errorHandler.handleError(error);
      return { message: 'Failed to retrieve documents', payload: null };
    }
  }

  async get<T extends Document>(
    Model: Model<T>,
    id: string,
  ): Promise<MongoResponse<T>> {
    try {
      const document = await Model.findById(id);
      if (document) {
        return {
          message: 'Document retrieved successfully',
          payload: document,
        };
      }
      return { message: 'Document not found', payload: null };
    } catch (error) {
      this.errorHandler.handleError(error);
      return { message: 'Failed to retrieve document', payload: null };
    }
  }

  async update<T extends Document>(
    Model: Model<T>,
    id: string,
    data: Partial<T>,
  ): Promise<MongoResponse<T>> {
    try {
      const updatedDocument = await Model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updatedDocument) {
        return {
          message: 'Document updated successfully',
          payload: updatedDocument,
        };
      }
      return { message: 'Document not found', payload: null };
    } catch (error) {
      this.errorHandler.handleError(error);
      return { message: 'Failed to update document', payload: null };
    }
  }

  async delete<T extends Document>(
    Model: Model<T>,
    id: string,
  ): Promise<MongoResponse<null>> {
    try {
      const deletedDocument = await Model.findByIdAndDelete(id);
      if (deletedDocument) {
        return { message: 'Document deleted successfully', payload: null };
      }
      return { message: 'Document not found', payload: null };
    } catch (error) {
      this.errorHandler.handleError(error);
      return { message: 'Failed to delete document', payload: null };
    }
  }

  public async testConnection(): Promise<boolean> {
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping();
        return true;
      }
      return false;
    } catch (error) {
      console.error('MongoDB connection test failed:', error);
      return false;
    }
  }
}
const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.kewo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const mongoService = new MongoService(uri);

export default mongoService;
