import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

const env = process.env.NODE_ENV
const config = {
  input: 'src/index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': ['Children', 'Component', 'PropTypes', 'createElement'],
        'react-dom': ['render', 'findDOMNode']
      }      
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    json({
      include: 'node_modules/**'      
    })
  ],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ]
}

if (env === 'es' || env === 'cjs') {
  config.output = {
    exports: 'named',
    globals: { react: 'React', 'prop-types': 'PropTypes', preact: 'preact' },      
    format: env
  }
  config.external = ['symbol-observable']
}

if (env === 'development' || env === 'production') {
  config.output = { format: 'umd' }
  config.name = 'postcast'
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  )
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
