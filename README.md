# Dependency Search &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)

A tool that identifies node.js projects that make use of (directly or indirectly) one or more user specifiable packages (each with a specific version).

It searches a directory (and any descendant directories) for package.json files, and then examines the dependencies/devDependencies sections for target packages.

## Usage

You can execute the tool using the following command...

```
npm run start -- [path-and-filename-of-dependencies-file] [search-directory]
```

 - [path-and-filename-of-dependencies-file] is the path/filename of a file containing a list of dependencies you want to search for. This file should consist of one or more lines, each consisting of a package name, followed by an '@', followed by the version you're looking for.

 - [search-directory] is the path to a directory containing the projects you wish to search.

So, for example - if you had a file named `c:\dependencies.txt` that looked like this (note the malformed first line that will be ignored)...

```
hello
chai@6.2.1
@semantic-release/git@10.0.1
```

...and your projects were under the `c:\projects` directory. If you execute the following command...

```
npm run start -- c:\dependencies.txt c:\projects
```

You will get output looking something like this...

```
"C:\Program Files\nodejs\npm.cmd" run start -- c:\dependencies.txt c:\projects

> dependency-search@1.0.0 start
> node ./lib/index.js c:\dependencies.txt c:\projects

dependencies file: c:\dependencies.txt
  - file exists
  - file is readable
  - ignoring entry (line 1): hello
  - 2 target dependencies found

search directory: c:\projects
  - directory exists
  - directory is readable

Searching for package.json files under c:\projects...
  - 26582 package.json files found

searching for target dependencies...
  - unable to parse c:\projects\test-package1\node_modules\@quasar\app-webpack\templates\capacitor\package.json (NOTE: this file will not be checked!)
  - unable to parse c:\projects\test-package1\node_modules\resolve\test\resolver\malformed_package_json\package.json (NOTE: this file will not be checked!)
  - unable to parse c:\projects\test-package1\node_modules\resolve\test\resolver\malformed_package_json\package.json (NOTE: this file will not be checked!)
  - target dependency chai@6.2.1 found in c:\projects\dependency-search\package.json
  - number of package.json files found with a target dependency, but with a different version: 1577
  - number of package.json files found with a target dependency of the specified version: 1

Process finished with exit code 0
```

## Licensing

This project uses the MIT license (see https://spdx.org/licenses/MIT.html).