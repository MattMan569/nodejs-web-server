const fs = require('fs');

/**
 * @param {string} directory
 * @return {string} fileName
 */
const getRandFile = (directory) => {
    // return fs.readdirSync(directory)[(Math.random() * (this.length))];
    const files = fs.readdirSync(directory);
    return files[Math.floor(Math.random() * files.length)];
};

module.exports = getRandFile;
