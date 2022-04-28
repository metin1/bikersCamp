'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const publicUrlOrPath = ''

module.exports = {
	esLintFile: resolveApp('.eslintrc.js'),
	dotenv: resolveApp('.env'),
	appPath: resolveApp('.'),
	appBuild: resolveApp('build'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveApp('src/index.tsx'),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp('src'),
	appTsConfig: resolveApp('tsconfig.json'),
	yarnLockFile: resolveApp('yarn.lock'),
	appNodeModules: resolveApp('node_modules'),
	publicUrlOrPath,
	testsSetup: resolveApp('src/setupTests.ts'),
}
