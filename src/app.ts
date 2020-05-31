import path from 'path'
import feathers from '@feathersjs/feathers'
import express, { Application as ExpressFeathers, Router } from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import configuration from '@feathersjs/configuration'

import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import logger from './logger'
import { Application } from './declarations'
import appHooks from './hooks/app.hooks'
import routerConf from './router_start'
import entry from './views/entry-ssr-vue'

const app: Application = express(feathers())

app.configure(configuration())
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use("/", express.static("./lib", { dotfiles: "ignore", extensions : ['js', 'css', 'jpeg', 'png'] }))

app.configure(express.rest())
app.configure(socketio())
app.configure(routerConf)
const router = express.Router({ strict : true })
// router.use(express.static("./", { dotfiles: "ignore", extensions : ['js', 'css', 'jpeg', 'png'] }))
router.use("/", entry)
app.use(router)

app.use(express.notFound())
app.use(express.errorHandler({ logger } as any))

app.hooks(appHooks)
export default app
