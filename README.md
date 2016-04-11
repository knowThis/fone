# angular 开发基础模版
>使用requrejs和angular一起搭建的angular脚手架.

```
|---css  ---样式资源目录
|---js      --- 主要js逻辑目录
|------app.js    --- index.html 文件的所有逻辑叶敏啊
|------common.js  ---公共函数的js 文件
|------main.js  ---入口js 文件,主要是requirejs 的配置文件
|------route.js ---路由文件
|------math.js -- 数学计算的相关函数
|---lib  -- 使用bower 加载的相关库函数
|---modules   ---项目
|------index    ---例如
|---------index.html
|---------indexCtrl.js
|---host.js  --路由配置
|---fis-conf.js --使用fis3 进行压缩等等操作
|---index.html  --入口文件
```

``` javascript
    //初始化 程序在newproject目录下
    fone-angular init
    //打开外网ip的本地服务
    fone-angular s
```


# 感谢
>@14 写的fone,用fone这个工具打包项目目录
>@芝麻设计的angular目录结构,感觉非常实用,扩展起来得心应手.
>我就把两个结合起来了

