const { argv, exit } = require('node:process')
const fs = require('node:fs')
const os = require('node:os')
const { globSync } = require('glob')
const indexerService = require('./indexer-service')

function processCLIParamsAndExecute () {
  if (argv.length !== 4) {
    console.log('required parameters have not been specified')
    console.log('\ndependency-search can be executed in the following manner...')
    console.log('\n  node run start -- [path-and-filename-of-dependencies-file] [search-directory]')
    console.log('\nwhere...')
    console.log('  - [path-and-filename-of-dependencies-file] is the path/filename of a file containing a list of dependencies you want to search for. This file should consist of one or more lines, each consisting of a package name, followed by an \'@\', followed by the version you\'re looking for.')
    console.log('  - [search-directory] is the path to a directory containing the projects you wish to search.')
    exit(1)
  }

  const dependenciesFile = argv[2]
  console.log(`dependencies file: ${dependenciesFile}`)

  try {
    fs.accessSync(dependenciesFile, fs.constants.F_OK)
    console.log('  - file exists')
  } catch (err) {
    console.log('  - file does not exist')
    exit(1)
  }

  try {
    fs.accessSync(dependenciesFile, fs.constants.R_OK)
    console.log('  - file is readable')
  } catch (err) {
    console.log('  - file is unreadable')
    exit(1)
  }

  let dependenciesFileContents
  try {
    dependenciesFileContents = fs.readFileSync(dependenciesFile, 'utf8')
    dependenciesFileContents = dependenciesFileContents.trim()
  } catch (err) {
    console.error(err)
    exit(1)
  }

  let targetDependencies = dependenciesFileContents.split(os.EOL)
  dependenciesFileContents = null

  for (let i = 0; i < targetDependencies.length; i++) {
    const d = targetDependencies[i].trim()
    const index = d.lastIndexOf('@')
    if (index === -1) {
      targetDependencies[i] = null
      console.log(`  - ignoring entry (line ${i + 1}): ${d}`)
    } else {
      targetDependencies[i] = [d.substring(0, index), d.substring(index + 1)]
    }
  }

  targetDependencies = targetDependencies.filter(d => d !== null)
  console.log(`  - ${targetDependencies.length} target dependencies found`)

  const searchDirectory = argv[3]
  console.log(`\nsearch directory: ${searchDirectory}`)

  try {
    fs.existsSync(searchDirectory)
    console.log('  - directory exists')
  } catch (err) {
    console.log('  - directory does not exist')
    exit(1)
  }

  try {
    fs.accessSync(searchDirectory, fs.constants.R_OK)
    console.log('  - directory is readable')
  } catch (err) {
    console.log('  - directory is unreadable')
    exit(1)
  }

  console.log(`\nSearching for package.json files under ${searchDirectory}...`)
  const packageJsonFiles = findPackageJsonFiles(searchDirectory)
  console.log(`  - ${packageJsonFiles.length} package.json files found`)

  console.log('\nsearching for target dependencies...')
  const results = indexerService.search(searchDirectory, packageJsonFiles, targetDependencies)

  console.log(`  - number of package.json files found with a target dependency, but with a different version: ${results.packageMatchCount}`)
  console.log(`  - number of package.json files found with a target dependency of the specified version: ${results.packageAndVersionMatchCount}`)
}

function findPackageJsonFiles (searchDirectory) {
  return globSync('**/package.json', { cwd: searchDirectory })
}

processCLIParamsAndExecute()
