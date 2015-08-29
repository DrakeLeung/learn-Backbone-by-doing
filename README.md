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



