const { series, parallel } = require('ethical-composer-utility')
const { default: watcher } = require('ethical-composer-emitter-watcher')
const { default: route } = require('ethical-composer-middleware-route')
const { default: babel } = require('ethical-composer-middleware-babel')
const { default: file } = require('ethical-composer-middleware-file-system')

const transpileBrowserJSFiles = series(
    route('src/{browser/**/*,shared/**/*}.js'),
    babel({ babel: require('./babel.json') }),
    file({ dest: 'dist', base: 'src' })
)

const transpileNodeJSFiles = series(
    route('src/node/**/*.js'),
    babel({ babel: require('./babel.node.json') }),
    file({ dest: 'dist', base: 'src' })
)

const log = async (ctx, next) => {
    console.log('Processed:', ctx.file.path)
}

const tasks = series(
    parallel(transpileBrowserJSFiles, transpileNodeJSFiles),
    log
)

const runWatcher = (tasks) => () => {
    watcher('src', async (file) => await tasks({ file }))
    .then(() => console.log('Watcher started!'))
    .catch(e => console.error(e))
}


const Vinyl = require('vinyl')
const { readFileSync, lstatSync } = require('fs')
const glob = require('glob')
// Trigger file changes to all source files
const runDev = (tasks, pattern) => {
    const files = glob.sync(pattern)
    const next = async (index = 0) => {
        const path = files[index]
        if (!path) {
            return
        }
        if (lstatSync(path).isDirectory()) {
            return await next(index + 1)
        }
        const contents = readFileSync(path)
        const file = new Vinyl({ path, contents })
        await tasks({ file })
        await next(index + 1)
    }
    return next()
}

runDev(tasks, 'src/**/*')
.then(() => console.log('Done !'))
// .then(runWatcher(tasks))
