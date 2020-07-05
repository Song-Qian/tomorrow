/**
 * Developer  : SongQian
 * Time       : 2020-01-05
 * eMail      : onlylove1172559463@vip.qq.com
 * Description: SSR 服务端配置入口开始
 */
import { resolve } from 'path'
import fs from 'fs'
import { Request, Response, NextFunction } from 'express'
import { createBundleRenderer } from 'vue-server-renderer'
import entryService from './entry-service'

export default function (req, res: Response, next: NextFunction) {
  const context = { url : req.path, user : req.session.user || {} }
  // tslint:disable-next-line: no-floating-promises
  entryService(context).then(
    // tslint:disable-next-line: variable-name
    (ssr_vue: any) => {
      // const renderer = createRenderer({
      //   template: `<!DOCTYPE html><html lang="en"><head><title>Hello</title>{{{ renderStyles() }}}</head><body><!--vue-ssr-outlet-->{{{ renderScripts() }}}</body></html>`,
      //   inject: true
      // })
      // tslint:disable-next-line: variable-name
      const ssr_server =  fs.readFileSync(resolve('./lib', 'vue-ssr-server-bundle.json'), 'UTF-8');
      // tslint:disable-next-line: variable-name
      const ssr_client = fs.readFileSync(resolve('./lib', 'vue-ssr-client-manifest.json'), 'UTF-8');
      //require(ssr_server.replace(/\\+/g, '/'))
      //require(ssr_client.replace(/\\+/g, '/'))
      const renderer = createBundleRenderer(JSON.parse(ssr_server), {
        template: `<!DOCTYPE html><html lang="en"><head><title>tomorrow</title>{{{ renderStyles() }}}</head><body><!--vue-ssr-outlet-->{{{ renderScripts() }}}</body></html>`,
        inject: true,
        runInNewContext: true,
        clientManifest: JSON.parse(ssr_client)
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
      console.log(JSON.stringify(err))
      res.set('Content-Type', 'text/html')
      // tslint:disable-next-line: deprecation
      const code_500 = `<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><p>${err.message}</p></body></html>`;
      res.send(Buffer.alloc(code_500.length, code_500, 'utf8'));
      res.status(200).end()
    })
}
