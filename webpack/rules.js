/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产编译处理配置
 */

let path = require("path");

module.exports = function(basicExtract, skinExtract) {
  //   var vueLoader = {
  //     test: /\.vue$/,
  //     loader: 'vue-loader',
  //     options: {
  //       loaders: {
  //           // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
  //           // the "scss" and "sass" values for the lang attribute to the right configs here.
  //           // other preprocessors should work out of the box, no loader config like this necessary.
  //           'scss': basicExtract.extract({ fallback : 'vue-style-loader', use : 'css-loader!sass-loader' }),
  //           'sass': basicExtract.extract({ fallback : 'vue-style-loader', use : 'css-loader!sass-loader' }),
  //           'css': basicExtract.extract({ fallback : 'vue-style-loader', use : 'css-loader!style-loader' })
  //       },
  //       transformToRequire: {
  //           video: ['src', 'poster'],
  //           source: 'src',
  //           img: 'src',
  //           iframe : 'src',
  //           embed : 'src',
  //           image: 'xlink:href'
  //       }
  //     }
  // }

    const JS_Loader = {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env']
          }
        }
    }

    const TS_Loader = { 
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      // options: { appendTsSuffixTo: [/\.vue$/] }
    }

    const URL_Loaer  = {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
            limit: 6144,
            name: 'assets/Images/[name].[ext]?cache=[hash:8]'
        }
    }

    const cssLoader = {
        test: /\.css$/,
        use : basicExtract.extract({ fallback : 'css-loader', use : 'css-loader'})
    }

    const sassLoader = {
        test: /\.(sass|scss)$/,
        use : skinExtract.extract({ fallback: 'css-loader!sass-loader', use : 'css-loader!sass-loader' })
    }

    const jsonLoader = {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
            name: 'assets/data/[hash:8].[name].json'
        }
    }

    const fileLoader = {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/Css/font/[name].[ext]'
        }
    }

    return [
        // vueLoader,
        JS_Loader,
        TS_Loader,
        URL_Loaer,
        cssLoader,
        sassLoader,
        jsonLoader,
        fileLoader
    ]
}