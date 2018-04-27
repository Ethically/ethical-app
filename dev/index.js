const { createLogger } = require('bunyan')
const { emptyDirSync } = require('fs-extra')
const socket = require('ethical/helper/socket')
const { series, parallel } = require('ethical/orche')
const babel = require('ethical/orche/babel')
const file = require('ethical/orche/file')
const lazy = require('ethical/orche/lazy')
const rename = require('ethical/orche/rename')
const route = require('ethical/orche/route')
const setup = require('ethical/orche/setup')
const server = require('ethical/orche/server')
const state = require('ethical/orche/state')
const watcher = require('ethical/orche/watcher')

const init = async () => {

    emptyDirSync('./dist')

    const log = createLogger({ name: 'ethical-dev' })

    log.info('Initializing...')
    log.info('Starting Web Socket...')

    const { stream, io } = await socket({ log })

    log.addStream({ stream })

    const refreshServer = server({ path: 'dist/server', log, io })

    const saveFileAndRestartServer = series(
        file({ dest: 'dist', base: 'src' }),
        series(
            route('src/shared/components/**/*.js'),
            lazy({ dest: 'dist', base: 'src' })
        ),
        refreshServer
    )

    const transpileBrowserJSFiles = series(
        route('src/{client/**/*,shared/**/*}.js'),
        babel({ babel: require('./babel.json'), log }),
        saveFileAndRestartServer
    )

    const transpileNodeJSFiles = series(
        route('src/server/**/*.js'),
        babel({ babel: require('./babel.node.json'), log }),
        saveFileAndRestartServer
    )

    const logger = ({ log }) => async (ctx, next) => {
        log.info('Processed:', ctx.file.path)
    }

    const tasks = series(
        parallel(
            series(
                state({ filter: ['CREATED', 'MODIFIED'] }),
                parallel(transpileBrowserJSFiles, transpileNodeJSFiles)
            ),
            series(
                state({ filter: ['RENAMED'] }),
                rename({ dest: 'dist', base: 'src' }),
                refreshServer
            ),
            series(
                state({ filter: ['DELETED'] }),
                refreshServer
            )
        ),
        logger({ log })
    )

    try {

        log.info('Starting Dev Server...')
        await require('ethical/dev/proxy')

        log.info('Processing Files...')
        await setup(tasks, 'src/**/*')

        log.info('Starting File Watcher...')
        await watcher('src', async (file) => await tasks({ file }))

    } catch (e) {
        log.error(e)
    }
}

init()
