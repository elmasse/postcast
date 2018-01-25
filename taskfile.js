import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import async from 'rollup-plugin-async'

export async function cjs(task, opts) {
  await task
    .source('src/index.js')
    .rollup({
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        async(),
        commonjs({
          include: 'node_modules/**',
          namedExports: {
            'react': ['Children', 'Component', 'PropTypes', 'createElement'],
            'react-dom': ['render', 'findDOMNode']
          }      
        }),
        resolve({
          jsnext: true,
          main: true
        }),
        json({
          include: 'node_modules/**'      
        })            
      ],
      external: [
        'react',
        'react-dom',
        'prop-types'
      ],  
      output: {
        file: 'postcast.js',
        globals: { react: 'React', 'prop-types': 'PropTypes', preact: 'preact' },      
        format: 'cjs'
      }
    })
    .target('dist/')
}

export async function es(task, opts) {
  await task
    .source('src/index.js')
    .rollup({
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        commonjs({
          include: 'node_modules/**',
          namedExports: {
            'react': ['Children', 'Component', 'PropTypes', 'createElement'],
            'react-dom': ['render', 'findDOMNode']
          }      
        }),
        resolve({
          jsnext: true,
          main: true
        }),
        json({
          include: 'node_modules/**'      
        })            
      ],
      external: [
        'react',
        'react-dom',
        'prop-types'
      ],  
      output: {
        file: 'es/postcast.js',
        globals: { react: 'React', 'prop-types': 'PropTypes', preact: 'preact' },      
        format: 'es'
      }
    })
    .target('dist/')
}

export async function compile(task) {
  await task.parallel(['cjs'])
}

export async function build(task) {
  await task.serial(['lint',  'compile'])
}

export async function lint(task) {
  await task.source('src/**/*.js').standard();
}

export default async function (task) {
  await task.start('build')
  await task.watch('src/**/*.js', ['lint','compile'])
}

export async function release (task) {
  await task.clear('dist').start('build')
}
