jest.mock('fs')
describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  it('include all files in the directory', () => {
    const FileSummarizer = require('../FileSummarizer')
    const results = FileSummarizer.summarizeFilesInDirectorySync('/path/to')
    expect(results.length).toEqual(2)
    expect(results[0].filename).toEqual('file1.js')
  })
})
