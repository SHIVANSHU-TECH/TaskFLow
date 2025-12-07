import cron from 'node-cron';
import https from 'https';

export const startCronJob = () => {
    // Run every 14 minutes
    cron.schedule('*/8 * * * *', () => {
        console.log('Running Keep-Alive Cron Job');

        const backendUrl = 'https://taskflow-c48a.onrender.com'; // Hardcoded as per user request context, or use env

        https.get(backendUrl, (res) => {
            console.log(`Keep-Alive Ping Status: ${res.statusCode}`);
        }).on('error', (e) => {
            console.error(`Keep-Alive Ping Error: ${e.message}`);
        });
    });
};
