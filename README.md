# learn-Backbone-by-doing
learn Backbone by doing some demos

## Usage
- Install the dependencies: `npm install`
- Run the webpack-dev-server: `npm run dev`

## License
MIT

## Issues
> 究竟需不需要`AppView`? 

那好, 如果有`AppView`的话, 我们就可以处理一开始在`index.html`写好的代码. 比如一个
搜索框, 这些没有用到template上面. 假设没有的话, 我们要怎么处理?

> router不起作用?

我是这样设置的:
```javascript
routes: {
	'': 'album',
},

album: function () {
	alert('album');
}
```

解决方法就是加上这句话: `Backbone.history.start();`. 下面是文档:

> During page load, after your application has finished creating all of its routers, be sure to call Backbone.history.start() 
or Backbone.history.start({pushState: true}) to route the initial URL.

> 点击一个item的时候, 怎么给他的parent也就是`li`设置一个背景色

首先, 当点击这个item的时候, 就给他添加一个`active`的class. 但是, 当点击第2个的时候就要去除之前的那个, 这就需要循环一遍了.
另外一种解决方法呢? 就是让`a`来充满`li`, 这样直接设置`a`的background就行了.
还有一种YY就是: 如果可以直接有parent selector就好了^_^ 但据我所知CSS还没有可以根据child还选择parent的选择器.

> 因为在调试的时候, 我的URL不总是root,比如`/#/album/4`, 这样当live-reload的时候, 我都要手动去更换URL.

这个时候可以使用`router.navigate()`来帮助我们跳转, 

```javascript
router.navigate('', { trigger: true });
```

> 给模板里面的`textarea`注入数据, 会连同空白字符一起注入. 