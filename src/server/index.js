import startServer from 'ethical/server'
import staticFile from 'ethical/server/static'
import postData from 'ethical/server/post-data'
import jsonBody from 'ethical/server/json'
import moduleSupplier from 'ethical/server/supplier'
import reactRedux from 'ethical/server/react-redux'

export default (
    startServer()
    .use(staticFile())
    .use(postData())
    .use(jsonBody())
    .use(moduleSupplier({ main: 'dist/client' }))
    .use(reactRedux({
        layout: './dist/server/Layout.js',
        routes: './dist/shared/Routes.js',
        store: './dist/shared/utilities/store.js'
    }))
    .listen()
)
