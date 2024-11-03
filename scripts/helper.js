const fs = require('fs');
const path = require('path');
const logger = require('./logger');
// Helper function to save data to a file

function saveData(data,outputPath)
{
    try {
        // Ensure the output directory exists
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        // Generate a unique filename with a timestamp
        const timestamp = Date.now();
        const fileName = `/results_${timestamp}.json`;
        const filePath = path.join(outputPath, fileName);

        // Write data to the new file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logger.info(`Data saved to ${filePath}`);

    } catch (err) {

        logger.error("Error saving data:", err);
    }
    
}



module.exports = {
    saveData,
};