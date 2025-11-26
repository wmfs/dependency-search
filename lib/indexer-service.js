const fs = require('node:fs')
const path = require('node:path')

module.exports = {
  async search (searchDirectory, packageJsonFiles, targetDependencies) {
    let packageMatchCount = 0
    let packageAndVersionMatchCount = 0

    for (let file of packageJsonFiles) {
      file = path.join(searchDirectory, file)

      let fileContents
      try {
        fileContents = fs.readFileSync(file, 'utf8')
      } catch (err) {
        console.log(`  - unable to read ${file} (NOTE: this file will not be checked!)`)
        continue
      }

      let packageFile
      try {
        packageFile = JSON.parse(fileContents)
      } catch (err) {
        console.log(`  - unable to parse ${file} (NOTE: this file will not be checked!)`)
        continue
      }

      const packageDependencies = []
      if (packageFile.dependencies) {
        for (const [pkg, version] of Object.entries(packageFile.dependencies)) {
          packageDependencies.push([pkg, (version.startsWith('~') || version.startsWith('^')) ? version.substring(1) : version])
        }
      }
      if (packageFile.devDependencies) {
        for (const [pkg, version] of Object.entries(packageFile.devDependencies)) {
          packageDependencies.push([pkg, (version.startsWith('~') || version.startsWith('^')) ? version.substring(1) : version])
        }
      }

      for (const pkg of packageDependencies) {
        for (const targetPackage of targetDependencies) {
          if (pkg[0] === targetPackage[0]) {
            if (pkg[1] !== targetPackage[1]) {
              packageMatchCount++
            } else {
              console.log(`  - target dependency ${pkg[0]}@${pkg[1]} found in ${file}`)
              packageAndVersionMatchCount++
            }
          }
        }
      }
    }

    console.log(`  - number of package.json files found with a target dependency, but with a different version: ${packageMatchCount}`)
    console.log(`  - number of package.json files found with a target dependency of the specified version: ${packageAndVersionMatchCount}`)
  }
}
