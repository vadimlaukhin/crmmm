var gulp   = require('gulp');
var sync   = require('browser-sync');
var sass   = require('gulp-sass');


gulp.task('sync', function()
{
    sync.init( {proxy:"localhost:2001" } );
})
gulp.task('html',function()
{
    return gulp.src('client/*.html')
        .pipe( sync.reload({stream:true}) )
})
gulp.task('images',function()
{
    return gulp.src('client/img/*/**.svg')
        .pipe( sync.reload('*.js') );
})
gulp.task('sass', function()
{
    return gulp.src('client/css/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/css'))
        .pipe( sync.reload({stream:true}) )
})

gulp.task('js',function()
{
    return gulp.src('client/js/*/**/***/****.js')
        .pipe( sync.reload({stream:true}))
})
gulp.task('app',function()
{
    return gulp.src('app.js')
        .pipe( sync.reload('*.js') );
})

gulp.task('watch',function()
{
    gulp.watch('client/css/*.scss',gulp.parallel('sass'));
    gulp.watch('client/*.html',gulp.parallel('html'));
    gulp.watch('client/img/*/**.svg',gulp.parallel('images'));
    gulp.watch('client/js/*/**/***/****.js',gulp.parallel('js'));
    gulp.watch('app.js',gulp.parallel('app'));

})
gulp.task('default', gulp.parallel('watch','sass','sync'));