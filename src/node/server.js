import ethicalServer from 'ethical-utility-server'
import staticFile from 'ethical-server-middleware-static'
import moduleSupplier from 'ethical-server-middleware-module-supplier'
import reactRedux from 'ethical-server-middleware-react-redux'

const cache = {}
export default (
    ethicalServer({ port: 9090 })
    .use(staticFile())
    .use(moduleSupplier({ main: 'dist/browser/entry.js' }))
    .use(reactRedux({
        routes: './dist/shared/Routes.js',
        layout: './dist/shared/Layout.js',
        reducers: './dist/shared/reducers/index.js'
    }))
    .listen()
    .then(() => console.log('Open Browser to: http://localhost:9090'))
)
