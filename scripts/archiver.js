const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const logger = require('./logger');

function archiveDataFolder() {
    const dataFolder = path.join(__dirname, '../data');
    const outputFilePath = path.join(__dirname, '../data/results.zip');

    // Ensure the output directory exists
    if (!fs.existsSync(dataFolder)) {
        logger.error("Data folder does not exist.");
        return;
    }

    // Create a file to stream archive data
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Compression level
    });

    // Listen for any errors and finalize the archive when done
    output.on('close', () => {
        logger.info(`Archive created successfully. Size: ${archive.pointer()} bytes`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    // Pipe archive data to the output file
    archive.pipe(output);

    // Add all JSON files in the data folder to the archive
    fs.readdirSync(dataFolder).forEach(file => {
        const filePath = path.join(dataFolder, file);
        if (path.extname(file) === '.json') {
            archive.file(filePath, { name: file });
        }
    });

    // Finalize the archive (necessary to complete the archiving process)
    archive.finalize();
}

module.exports = {
    archiveDataFolder,
};