import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import configuration from '@feathersjs/configuration'

import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'

import logger from './logger'
import uuid from './utils/UUID'
import serviceio from './service.io'
import { Application } from './declarations'
import appHooks from './hooks/app.hooks'
import routerConf from './router_start'
import entry from './views/entry-ssr-vue'

const app: Application = express(feathers())

app.configure(configuration())
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(session({ secret : uuid(), name : 'tomorrow_sid', genid : uuid, resave: true, rolling:true, saveUninitialized : true, cookie : { path: '/', httpOnly: true, maxAge: 86400, secure : false } }))
app.use(express.json({ limit : '15mb' }))
app.use(express.urlencoded({ extended : true }))

app.use("/", express.static("./lib", { dotfiles: "ignore", extensions : ['js', 'css', 'jpeg', 'png', 'jpg'] }))

app.configure(express.rest(function(req, rsp, next) {
    if(req.path === '/api/users/login' && req.method === "GET") {
        (req as any).session.user = rsp.data.data;
    }
    express.rest.formatter(req, rsp, next);
}))
app.configure(
    socketio(app.get('io').port, {
        pingTimeout: app.get('io').pingTimeout,
        pingInterval: app.get('io').pingInterval,
        maxHttpBufferSize : app.get('io').maxHttpBufferSize,
        transports : app.get('io').transports,
        cookie : app.get('io').cookie,
        cookiePath : app.get('io').cookiePath,
        cookieHttpOnly : app.get('io').cookieHttpOnly
    },
    serviceio.bind(app))
)
app.configure(routerConf)
const router = express.Router({ strict : true })
router.use("/", entry)
app.use(router)

app.use(express.notFound())
app.use(express.errorHandler({
    logger : (logger as any),
    html : {
        404 : '',
        500 : ''
    }
}))

app.hooks(appHooks)
export default app
