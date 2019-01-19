var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');
gulp.task('sass',function(){
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
});
gulp.task('watch',function(){
	gulp.watch('./src/scss/*.scss',gulp.series('sass'));
});
gulp.task('server',function(){
	return gulp.src('./src')
	.pipe(server({
		port:8000,
		open:true,
		proxies:[{//iconlist
			source:"/classify/iconlist",
			target:"http://localhost:3000/classify/classify/iconlist"
		},{//添加用户
			source:"/users/addUser",
			target:"http://localhost:3000/users/users/addUser"
		},{//添加分类
			source:"/classify/addclassify",
			target:"http://localhost:3000/classify/classify/addclassify"
		},{//查询分类
			source:"/classify/getClassify",
			target:"http://localhost:3000/classify/classify/getClassify"
		},
		{//添加
			source:"/bill/billlist",
			target:"http://localhost:3000/bill/bill/billlist"
		},
		{//添加
			source:"/bill/getBill",
			target:"http://localhost:3000/bill/bill/getBill"
		}]
	}));
});
gulp.task('dev',gulp.series('sass','server','watch'));