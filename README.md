# learn-Backbone-by-doing
learn Backbone by doing some demos

## Snapshot
![](http://ww3.sinaimg.cn/large/7f85b91egw1evh72rqwizj20eu0a7js5.jpg)

## Check it out
Open your terminal: 

- clone the repo: `git clone https://github.com/DrakeLeung/learn-Backbone-by-doing.git`
- install the dependencies: `npm install`
- run the webpack-dev-server: `npm run dev`

Open a new tab of terminal, or another terminal

- run the json-server: `npm run server`

## License
MIT

## Issues

> 当我们在AppView里面添加一个todo的时候，我们怎么告诉TodoItemView

监听collection的事件,比如`update`, `add`.

> import的时候总是相对于该文件

这个似乎用到`import`的话就是这个样子= = 不过在webpack里面,想用什么都行. AMD, CMD, whatever...

> 不同view之间如何共享同一个collection或者model

我尝试在new一个viw instance的时候传递一个参数，就像这样:

```javascript
new TodoListView({
	collection: this.collection
});
```
这样是work的，但是当`key`是其他的时候（除了`model`和`collection`之外)，是failed。

```javascript
new TodoListView({
	todoCollection: this.collection
});
```

new出来的instance根本就不会有`todoCollection`这个property = =

> 当添加一个todo到collection的时候，要怎么更新页面。

我们可以使用在`initialize`时，就使用`listenerTo()`这个方法来监听`collection`的`add`事件，然后当触发的时候就调用一个
回调函数。例如: `listenerTo(collection, 'add', render)`

> OK,要怎样才能删除一个todo。或句话说，我怎么知道他是哪个todo。

首先，我要把一个todo的唯一标识(idProperty)注入到模板里面，然后根据这个idProperty来删掉对应的todo
一开始，我用的是用id来保存他在collection里面的index，然后通过`collection.remove(collection.at(index))`来删掉。
但是后来觉得不是很妥，所以改进了一下，使用`data-*`这个HTML attribute来保存todo的`title`，
然后根据`collection.remove(collection.where())`来删除。

> 我要怎么监听'删除todo'这个事件呢？

因为我想把所有的事件都放在`AppView`里面，然后我就这样: `click a.rm-todo: rmTodo`这个是work不了的。后来想到了用事件冒泡:
`click: rmTodo`，然后后就在`rmTodo`里面判断`event.target`是不是`a.rm-todo`。

> 当我点击label的时候，居然会出发2次click事件。

debug了一下，发现原来点击`label`也会触发对应的`input`的click事件，只要前者的`for`attribute和后者的`id`一致。

> 如何监听'Enter'键的按下事件

`keypress`事件, 检查`event.which`是不是`13`(也就是Enter)

> 我正在实现计算todo的功能. 为此, 我多弄了一个statView. 但是问题来了, 在todoListView来还执行完毕之前, statView已经渲染完成了.
这个并不是我所想的 = =

果然,这个在`fetch()`的时候是**async**的, 在callback调用就好.  
但是,我发现了fetch()的时候会出发collection的`add`事件

> 当数据发生变化时, 我需要手动去监听这个事件(listenTo), 并且我需要把含有旧数据的view清空或者删掉, 这显然是很不好的.

## Todos
### Improvement
- server support  :white_check_mark:
- edit todo
- search todo

### Logic 
- 检查input的值的时候，考虑**空白字符** :white_check_mark:
- 监听collection的`add`事件时, 不要渲染整个collection.

### Router
- all todos view  :white_check_mark:
- all done todos view
- all not done todos view

### UI
- 标题不够突出 :white_check_mark:
- 不需要submit按钮，这样感觉和todoList有点分离 :white_check_mark:
- '删除'按钮应该在hover itodo的时候才出现 :white_check_mark:
- 原生的checkbox不够漂亮，并且很weird 
- check的时候应该给todo加个删除线 :white_check_mark:
- 显示todo数量 :white_check_mark:

