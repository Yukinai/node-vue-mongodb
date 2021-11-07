module.exports = {
    outputDir: __dirname + "/../server/web/", //将文件输出到server/admin
    // publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/" //当生产环境，就会使用/admin的publi
    devServer: {
        port: 8081,     // 端口号
    },
   
};