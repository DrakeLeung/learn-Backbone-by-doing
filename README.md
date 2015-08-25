# learn-Backbone-by-doing
learn Backbone by doing some demos

## License
MIT

## Issues

> 当我们在AppView里面添加一个todo的时候，我们怎么告诉TodoItemView

> import的时候总是相对于该文件

> 不同view之间如何共享同一个collection或者model

我尝试在new一个viw instance的时候传递一个参数，就像这样:

```javascript
new TodoListView({
	collection: this.collection
});
```
这样是work的，但是当`key`是其他的时候（除了`model`和`collection`之外)，是failed。
```javascrip
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

