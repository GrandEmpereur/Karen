import { createInterface } from 'readline';
import { promises as fs, existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (existsSync(dirname)) {
        return true;
    }
    await ensureDirectoryExistence(dirname);
    await fs.mkdir(dirname, { recursive: true });
}

async function askQuestion(question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question + ' ', answer => {
            resolve(answer);
        });
    });
}

async function askForContact(): Promise<{ firstName: string; lastName: string; phoneNumber: string; email: string }> {
    const firstName = await askQuestion("Quel est le prénom du contact ?");
    const lastName = await askQuestion("Quel est le nom du contact ?");
    const phoneNumber = await askQuestion("Quel est le numéro de téléphone du contact ?");
    const email = await askQuestion("Quel est l'email du contact ?");
    return { firstName, lastName, phoneNumber, email };
}

async function main() {
    const companyName = await askQuestion("Quel est le nom de l'entreprise ?");
    const paymentStatus = await askQuestion("Quel est le statut de paiement (paid, pending, not paid) ?");

    const contact = await askForContact();
    const contacts = [contact];

    const projectId = uuidv4();

    const config = { projectId, companyName, paymentStatus, contacts };
    const configPath = path.resolve(__dirname, '../../tmp', 'config.json');
    await ensureDirectoryExistence(configPath);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    rl.close();
}

main();
