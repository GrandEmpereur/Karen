const axios = require('axios');
const fs = require('fs');
const { sendConfig } = require('../src/sendData');

jest.mock('axios'); // Mockez axios pour éviter les requêtes réseau réelles
jest.mock('fs'); // Mockez fs pour éviter les opérations sur le système de fichiers réelles

describe('sendConfig function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Nettoyez les mocks avant chaque test
  });

  test('should handle successful request', async () => {
    axios.post.mockResolvedValue({ status: 200 }); // Mockez une réponse réussie d'axios
    fs.existsSync.mockReturnValue(true); // Mockez l'existence du fichier
    fs.readFileSync.mockReturnValue(JSON.stringify({ data: 'test data' })); // Mockez la lecture du fichier
    fs.rmdirSync.mockImplementation(() => { }); // Mockez la suppression du dossier

    await sendConfig();

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:4200/api/v1/upload',
      { data: JSON.stringify({ data: 'test data' }) },
    );
    expect(fs.rmdirSync).toHaveBeenCalledWith('./tmp', { recursive: true });
  });
});