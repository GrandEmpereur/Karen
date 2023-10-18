import cron from 'node-cron';

export const generateCRONTask = (pattern: string, callback: CRONCallback, label = "") => {
    cron.schedule(pattern, async () => {
        if (typeof callback !== "function") {
            throw new Error("No function attached to this cron")
        }

        if (label && label != "") {
            console.log(`⏰ START ${label} ${new Date().getHours()}:${new Date().getMinutes()}`);
        }

        callback()

        if (label && label != "") {
            console.log(`⏰ END ${label} ${new Date().getHours()}:${new Date().getMinutes()}`);
        }
    });
}

interface CRONCallback {
    (): void
}
