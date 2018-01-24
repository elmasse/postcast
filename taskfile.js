import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'


export async function compile(task, opts) {
  await task
    .source('src/**/*.js')
    // .babel()
    .rollup({
      plugins: [
        babel({
          plugins: ['external-helpers'],
          exclude: 'node_modules/**'
        }),
        commonjs({
          include: 'node_modules/**'
        }),
        resolve({
          jsnext: true,
          main: true
        })
      ],
      output: {
        file: 'index.js',
        format: 'cjs'
      }
    })
    .target('dist/')
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
