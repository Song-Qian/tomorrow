/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: SSR 服务端配置入口开始
 */
import { resolve } from 'path'
import { Request, Response, NextFunction } from 'express'
import { createBundleRenderer, createRenderer } from 'vue-server-renderer'
import entryService from './entry-service'

export default function (req: Request, res: Response, next: NextFunction) {
  const context = { url : req.path }
  // tslint:disable-next-line: no-floating-promises
  entryService(context).then(
  // tslint:disable-next-line: variable-name
    (ssr_vue: any) => {
      // const renderer = createRenderer({
      //   template: `<!DOCTYPE html><html lang="en"><head><title>Hello</title>{{{ renderStyles() }}}</head><body><!--vue-ssr-outlet-->{{{ renderScripts() }}}</body></html>`,
      //   inject: true
      // })
      // tslint:disable-next-line: variable-name
      const ssr_server = resolve(__dirname, '../../lib', 'vue-ssr-server-bundle.json')
      // tslint:disable-next-line: variable-name
      const ssr_client = resolve(__dirname, '../../lib', 'vue-ssr-client-manifest.json')
      console.log(require('../../lib/vue-ssr-server-bundle.json'))
      const renderer = createBundleRenderer(require(ssr_server.replace(/\\+/g, '/')), {
        template: `<!DOCTYPE html><html lang="en"><head><title>Hello</title>{{{ renderStyles() }}}</head><body><!--vue-ssr-outlet-->{{{ renderScripts() }}}</body></html>`,
        inject: true,
        runInNewContext: true,
        clientManifest: require(ssr_client.replace(/\\+/g, '/'))
      })

      if (ssr_vue.code === 404) {
        res.status(404).end('no page')
        return
      }
      renderer.renderToString(context, (err: any, html: any) => {
        if (err) {
          res.status(500).end('Internal Server Error')
          return
        }
        res.set('Content-Type', 'text/html')
        // tslint:disable-next-line: deprecation
        res.send(Buffer.alloc(html.length, html, 'utf8'))
        res.status(200).end()
      })
    },
    (err: any) => {
      console.log(err.message)
      res.set('Content-Type', 'text/html')
      // tslint:disable-next-line: deprecation
      res.send(new Buffer(`
        <!DOCTYPE html>
        <html lang="en">
          <head><title>Hello</title></head>
          <body>
            <p>${err.message}</p>
          </body>
        </html>
      `, 'utf8'))
      res.status(200).end()
    })
}
