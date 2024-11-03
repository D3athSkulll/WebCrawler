const readline = require('readline');
const logger = require("./logger");
// Function to get user input from command line
function getUserInput(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function promptForURL() {
    const url = await getUserInput('Enter the URL to crawl: ');
    if (!url) {
        logger.error("No URL provided. Exiting.");
        process.exit(1);
    }
    return url;
}

module.exports = {
    promptForURL,
};