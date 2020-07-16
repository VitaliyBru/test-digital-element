`use strict`;

const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const map = require(`gulp-sourcemaps`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const csso = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);
const posthtml = require(`gulp-posthtml`);
const include = require(`posthtml-include`);
const del = require(`del`);
const wpStream = require(`webpack-stream`);
const webpack = require(`webpack`);
const wbCfg = require(`./webpack.config`);

gulp.task(`style`, () => {
  return gulp.src(`src/scss/style.scss`)
    .pipe(plumber())
    .pipe(map.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(map.write())
    .pipe(gulp.dest(`build/css`))
});

gulp.task(`server`, () => {
  server.init({
    server: `build/`,
    browser: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
  });

  gulp.watch(`src/scss/**/*.scss`, gulp.series(`style`));
  gulp.watch(`src/js/**/*.js`, gulp.series(`js`, `reload`));
  gulp.watch(`src/img/**/*.svg`, gulp.series(`sprite`, `html`, `reload`));
  gulp.watch(`src/*.html`, gulp.series(`html`, `reload`));
});

gulp.task(`js`, () => {
  return gulp.src(`src/js/**/*.js`)
    .pipe(wpStream(wbCfg, webpack))
    .pipe(gulp.dest(`build/js`))
});

gulp.task(`img`, () => {
  return gulp.src(`src/img/**/*.{jpg,png,svg}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(`build/img`))
});

gulp.task(`webp`, () => {
  return gulp.src(`src/img/**/*.{jpg,png}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`sprite`, () => {
  return gulp.src(`src/img/svg/*.svg`)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img/svg`));
});

gulp.task(`html`, () => {
  return gulp.src(`src/*.html`)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(`build`));
});

gulp.task(`clean`, () => del(`build`));

gulp.task(`copy`, () => {
  return gulp.src([
    `src/fonts/**/*.{woff,woff2}`,
    `src/img/*.*`,
    `src/*.json`
  ], {
    base: `src`
  })
    .pipe(gulp.dest(`build`));
});

gulp.task(`reload`, (done) => {
  server.reload();
  done();
});

gulp.task(`start`, gulp.series(`clean`, `copy`, `style`, `js`, `sprite`, `html`, `server`));
gulp.task(`build`, gulp.series(`clean`, `copy`, `style`, `js`, `sprite`, `html`));
