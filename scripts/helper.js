const fs = require('fs');
const path = require('path');
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
        console.log(`Data saved to ${filePath}`);

    } catch (err) {
        
        console.error("Error saving data:", err);
    }
    
}

function logError(error,context)
{
    console.error(`[${new Date().toISOString()}]Error in ${context}:`,error.message);
}

module.exports = {
    saveData,
    logError
};