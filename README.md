# Dependency Search &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)

A CLI node.js tool that identifies node.js projects that (directly or indirectly) make use of one or more user specifiable packages.

It searches a directory (and any descendant directories) for package.json files, and then examines the dependencies/devDependencies sections in each of those files for any of the target packages.

Those target packages are specified in a text file containing one or more lines, each consisting of a package name (as in the name in a package.json's dependencies/devDependencies block), followed by an '@', followed by the version you're looking for (so for example 'chai@6.2.1').

Do note that all files are assumed to use UTF-8 encoding.

## Usage

First clone the repository via the usual git command...

```
git clone https://github.com/wmfs/dependency-search.git
```

Then fetch the required dependencies using npm...

```
npm i
```

You can execute the tool using the following command...

```
npm run start -- [packages-file] [search-directory]
```

 - [packages-file] is the path and filename of the file containing the packages you want to search for (required).

 - [search-directory] is the path of the directory containing the projects you wish to search (required).

So, for example - if you had a file named `c:\dependencies.txt` that looked like this (note the malformed first line that will be ignored)...

```
hello
chai@6.2.1
@semantic-release/git@10.0.1
```

...and your projects were under the `c:\projects` directory, you can execute a search via the following command...

```
npm run start -- c:\dependencies.txt c:\projects
```

...which will result in output looking something like this...

```
"C:\Program Files\nodejs\npm.cmd" run start -- c:\dependencies.txt c:\projects

> dependency-search@1.0.0 start
> node ./lib/index.js c:\dependencies.txt c:\projects

packages file: c:\dependencies.txt
  - file exists
  - file is readable
  - ignoring malformed package: hello
  - 2 target packages found

search directory: c:\projects
  - directory exists
  - directory is readable

Searching for package.json files under c:\projects...
  - 26582 package.json files found

searching for target packages...
  - unable to parse c:\projects\test-package1\node_modules\@quasar\app-webpack\templates\capacitor\package.json (NOTE: this file will not be checked!)
  - unable to parse c:\projects\test-package1\node_modules\resolve\test\resolver\malformed_package_json\package.json (NOTE: this file will not be checked!)
  - unable to parse c:\projects\test-package1\node_modules\resolve\test\resolver\malformed_package_json\package.json (NOTE: this file will not be checked!)
  - target package chai@6.2.1 found in c:\projects\dependency-search\package.json
  - number of package.json files found with a target package, but with a different version: 1577
  - number of package.json files found with a target package of the specified version: 1

Process finished with exit code 0
```

## Licensing

This project uses the MIT license (see https://spdx.org/licenses/MIT.html).
