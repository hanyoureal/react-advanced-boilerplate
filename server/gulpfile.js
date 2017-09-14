const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

gulp.task('set-env-variables', () => {
  // mock server default socket
  process.env.MOCK_API_PORT = 3014;
});

gulp.task('set-dev-node-env', () => {
  process.env.NODE_ENV = 'development';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
});

gulp.task('set-prod-node-env', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('dev', ['lint', 'set-dev-node-env', 'set-env-variables'], () => {
  nodemon({
    script: 'index.js',
  });
});

gulp.task('prod', ['lint', 'set-prod-node-env', 'set-env-variables'], () => {
  nodemon({
    script: 'index.js',
  });
});
