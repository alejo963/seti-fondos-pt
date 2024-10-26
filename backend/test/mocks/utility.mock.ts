import { getModelToken } from '@nestjs/mongoose';

export const createMockModelProvider = (modelName: string, mockFunction) => {
  const provider = {
    provide: getModelToken(modelName),
    useValue: {
      new: jest.fn().mockResolvedValue(mockFunction()),
      constructor: jest.fn().mockResolvedValue(mockFunction()),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
      exec: jest.fn(),
    },
  };
  return provider;
};
