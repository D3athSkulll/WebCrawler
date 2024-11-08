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
        console.log("timestamp",timestamp);
        const fileName = `/results_${timestamp}.json`;
        const filePath = path.join(outputPath, fileName);

        // Write data to the new file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logger.info(`Data saved to ${filePath}`);

    } catch (err) {

        logger.error("Error saving data:", err);
    }
    
}




const todoFilePath = path.join(__dirname, '../logs/todo_links.txt');
const doneFilePath = path.join(__dirname, '../logs/done_links.txt');

// Ensure files exist
if (!fs.existsSync(todoFilePath)) fs.writeFileSync(todoFilePath, '');
if (!fs.existsSync(doneFilePath)) fs.writeFileSync(doneFilePath, '');

function getUniqueLinks(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const links = data.split('\n').map(link => link.trim()).filter(link => link);
    return Array.from(new Set(links)); // Return unique links only
}

// Helper function to save a list of links to a file
function saveLinks(filePath, links) {
    const uniqueLinks = Array.from(new Set(links)); // Ensure uniqueness
    fs.writeFileSync(filePath, uniqueLinks.join('\n') + '\n');
}

// Add a link to "todo" list if not already in "todo" or "done"
function addToTodoLinks(link) {
    link = link.trim();
    const todoLinks = getUniqueLinks(todoFilePath);
    const doneLinks = getUniqueLinks(doneFilePath);

    // Add link only if it's not already in either list
    if (!todoLinks.includes(link) && !doneLinks.includes(link)) {
        todoLinks.push(link);
        saveLinks(todoFilePath, todoLinks);
    }
}

// Move a link from "todo" list to "done" list
function moveToDoneLinks(link) {
    link = link.trim();
    let todoLinks = getUniqueLinks(todoFilePath);
    const doneLinks = getUniqueLinks(doneFilePath);

    // Only proceed if the link is in the "todo" list
    if (todoLinks.includes(link)) {
        // Remove the link from the "todo" list
        todoLinks = todoLinks.filter(todoLink => todoLink !== link);
        saveLinks(todoFilePath, todoLinks);

        // Add the link to the "done" list if not already present
        if (!doneLinks.includes(link)) {
            doneLinks.push(link);
            saveLinks(doneFilePath, doneLinks);
        }
    }
}

module.exports = {
    addToTodoLinks,
    moveToDoneLinks,
    saveData
};



