/* eslint-disable no-console */
const fs = require('fs');
const mockFs = require('mock-fs');
const { v4: mockUuidv4 } = require('uuid');
const createConfig = require('../src/userInput');

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('Create Config Script', () => {
  beforeEach(() => {
    mockFs({
      './tmp': {},
    });
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    mockFs.restore();
    console.log.mockRestore();
  });

  test('should create a config file with generated values if it does not exist', async () => {
    mockUuidv4.mockReturnValueOnce('test-uuid');
    await createConfig();

    const expectedData = JSON.stringify({
      name: 'user_test-uuid',
      status: 'fantome',
      id: 'test-uuid',
    }, null, 2);
    const configData = fs.readFileSync('./tmp/config.json', 'utf-8');
    expect(configData).toBe(expectedData);
    // expect(console.log).toHaveBeenCalledWith('Fichier config.json créé avec succès.');
  });
});
