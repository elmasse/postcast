import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const baseRollupPlugins = [
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true 
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
  })
]

const externals = [
  'react',
  'react-dom',
  'emotion',
  'frontmatter',
  'hastscript',
  'highlight.js',
  'react-emotion',
  'rehype-raw',
  'rehype-react',
  'remark-emoji',
  'remark-parse',
  'remark-rehype',
  'unified',
  'unist-builder'
]

export async function cjs(task, opts) {
  await task
    .source('src/index.js')
    .rollup({
      plugins: baseRollupPlugins,
      external: externals,  
      output: {
        file: 'postcast.js',
        format: 'cjs'
      }
    })
    .target('dist/')
}

export async function es(task, opts) {
  await task
    .source('src/index.js')
    .rollup({
      plugins: baseRollupPlugins,
      external: externals,  
      output: {
        file: 'es/postcast.js',
        format: 'es'
      }
    })
    .target('dist/')
}

export async function compile(task) {
  await task.parallel(['cjs', 'es'])
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
