

// const comptData = require('./public/edcuiCompts.json')

module.exports = {
  //  部署应用的基本url  可用 process.env.NODE_ENV 环境变量控制
  publicPath: './',
  //  指定生产环境目录
  outputDir: 'dist',
  //  指定生成静态资源的生成目录
  assetsDir: 'assets',
  //  指定生成的index.html的输出名
  indexPath: 'index.html',
  //  生成静态资源文件名包含hash以更好的控制缓存
  filenameHashing: true,
  //  是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  //  是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => { //  配置插件
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量文件路径，只有一个时可将数组省去
          resources: ['./src/utils/themeControl/variables/toolThemes.scss', './src/assets/css/themes/t01/theme.scss']
        })
        .end()
    })
    config.module
      .rule('images')
    // .use('image-webpack-loader')
    // .loader('image-webpack-loader')
  },
  //  这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    resolve: {
      alias: { // 配置快捷路径
        '@views': '@/views',
        '@component': '@/components'
      }
    },
    performance: {
      hints: false
    }
  },
  //  是否使用包含运行时编译器的 Vue 构建版本
  //  设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  //  如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  css: {
    //  是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: process.env.NODE_ENV !== 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  //  向 PWA 插件传递选项。
  pwa: {},
  //  这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
  pluginOptions: {
  },
  //  开发服务配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8009,
    https: false,
    hotOnly: false,
    proxy: {
      '/restful-env-api': {
        target: 'http://10.1.8.1:18060',
        pathRewrite: {
          '^/restful-env-api': '/'
        }
      },
      '/restful-env-test-api': {
        target: 'http://10.1.8.1:18160',
        pathRewrite: {
          '^/restful-env-test-api': '/'
        }
      },
      '/edc-sys-conn-api': {
        target: 'http://10.1.8.6:9199',
        pathRewrite: {
          '^/edc-sys-conn-api': '/'
        }
      },
      // 开发中心svc服务地址 访问nginx代理地址
      '/udap-develop-svc': {
        target: 'http://10.1.8.1:23000/udap-develop-svc',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/udap-develop-svc': '/'
        }
      },
      '/log-websocket': {
        target: 'http://localhost:1070',
        pathRewrite: {
          '^/log-websocket': '/'
        }
      }
    },
    overlay: {
      warnings: true, // 浏览器开启时提示警告及错误
      errors: true
    }
  }
}
