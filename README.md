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
