const fs = require('fs')

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(filename => ({
    directory,
    filename
  }))
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync
