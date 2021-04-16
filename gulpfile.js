
const gulp = require('gulp');
const path = require('path');
const through2 = require('through2');
const concat = require('gulp-concat');

gulp.task('sqlite', () => {
 return gulp.src('src/sqlite/**/*.sql')
  .pipe(through2.obj((file, enc, cb) => {
    [procName, proc] = parseFile(file);
    
    let newContents = `window.__sqliteProcs['${procName}'] = ${proc};\n`;
    file.contents = new Buffer(newContents, 'utf8');

    // providing file as second argument
    // instead of using this.push(file)
    cb(null, file)
  }))
  .pipe(concat('sqlite-procs.js'))
  .pipe(through2.obj((file, enc, cb) => {
    // Now we wrap everything in a function execute the lines
    // we created above

    let lines = file.contents.toString('utf8');

    let wrapper = '(function(window){ ' + 
      ' window.__sqliteProcs = {}; ' + 
      lines + '})(window)';

    file.contents = new Buffer(wrapper, 'utf8');

    cb(null, file);

  }))
  .pipe(gulp.dest('www'));
});

function parseFile(file) {
  let contents = file.contents.toString('utf8');
  let filename = path.basename(file.path);
  let procName = filename.substring(0, filename.indexOf('.'));

  contents = contents
  // split into individual lines
  .split(/^/gm)
  // Replace carriage returns and newlines on each line with a space
  // JSON.stringify gives quotes around each string
  .map((line) => JSON.stringify(line.replace(/(\r\n|\n|\r)/g, '') + ' '))
  // filter out any blank lines
  .filter((line) => !(/^"([\s]*)"$/).test(line))
  // join with a concat and newline
  .join(' +\n') || '""';

  // replace tabs with spaces
  contents = contents.replace(/(\\t)/g, '    ');

  return [procName, contents];
}
