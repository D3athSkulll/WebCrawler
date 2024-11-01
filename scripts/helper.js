const fs = require('fs');
function saveData(data,filePath)
{
    try {
        fs.writeFileSync(filePath,JSON.stringify(data,null,2))
    console.log("Data saved successfully to ",filePath);
    } catch (error) {
        console.error("Error saving data:",error.message);
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