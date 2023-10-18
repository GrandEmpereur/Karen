const fs = require('fs');
const mockFs = require('mock-fs');
const { v4: mockUuidv4 } = require('uuid');
const getUserInput = require('../src/userInput');

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('User Input Script', () => {
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

  test('should create a config file with user input and a generated UUID', async () => {
    mockUuidv4.mockReturnValueOnce('test-uuid');
    process.stdin.push('John Doe\nsuppression\n');
    await getUserInput();

    const expectedData = JSON.stringify({
      name: 'John Doe',
      status: 'suppression',
      id: 'test-uuid',
    }, null, 2);
    const configData = fs.readFileSync('./tmp/config.json', 'utf-8');
    expect(configData).toBe(expectedData);
    expect(console.log).toHaveBeenCalledWith('Fichier config.json créé avec succès.');
  });
});
