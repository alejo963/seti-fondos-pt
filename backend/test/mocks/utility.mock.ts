import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const createMockModelProvider = (modelName: string, mockFunction) => {
  const provider = {
    provide: getModelToken(modelName),
    useValue: {
      new: jest.fn().mockResolvedValue(mockFunction()),
      constructor: jest.fn().mockResolvedValue(mockFunction()),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
      deleteOne: jest.fn(),
      exec: jest.fn(),
    },
  };
  return provider;
};

export const stubMongoId = new Types.ObjectId('671d30ff2d178e227a88e463');
