'use strict';

const Collection = require('../../../src/models/collection.js');

describe('Collection class', () => {

  let mockModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  };

  beforeEach(() => {
    mockModel.findOne.mockClear();
    mockModel.findAll.mockClear();
    mockModel.create.mockClear();
    mockModel.update.mockClear();
    mockModel.destroy.mockClear();
  });

  it('get method works correctly', async () => {
    const collection = new Collection(mockModel);
    await collection.get(1);
    expect(mockModel.findOne).toHaveBeenCalledWith({ where: { id: 1 } });

    await collection.get();
    expect(mockModel.findAll).toHaveBeenCalledWith({});
  });

  it('create method works correctly', async () => {
    const collection = new Collection(mockModel);
    const record = { name: 'test' };
    await collection.create(record);
    expect(mockModel.create).toHaveBeenCalledWith(record);
  });

  it('update method works correctly', async () => {
    const collection = new Collection(mockModel);
    const id = 1;
    const data = { name: 'test' };
    mockModel.findOne.mockResolvedValue({ update: jest.fn() });
    await collection.update(id, data);
    expect(mockModel.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('delete method works correctly', async () => {
    const collection = new Collection(mockModel);
    const id = 1;
    await collection.delete(id);
    expect(mockModel.destroy).toHaveBeenCalledWith({ where: { id } });
  });
});
