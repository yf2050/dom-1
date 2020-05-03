这是自己封装的一个简单的DOM操作API，具有以下功能：

**调用时，请采用dom.option来进行操作，如：dom.create('div')**

- 封装DOM:像笔记本这样把功能封装起来用户通过接口便可操作
- 接口API：被封装的东西要暴露一些功能、属性、或者函数与外部，就是接口

- 封装自己的库：呈现create,get接口，支持直接调用函数

- 库：提供给别人的工具代码，里面主要是一些函数

- 框架：一些特别大的库 需要学习


封装前的准备：demo-1,index.html、main.js、dom.js

window.dom{}提供全局对象

## 增

```
用于创造节点 dom.create('<div>hi</div>')
用于新增弟弟 dom.after(node,node2)
用于新增哥哥 dom.before(node,node2)
用于新增儿子 dom.append(parent,child)
用于新增爸爸 dom.wrap(node,parent)
```

#### 1.创建div

向dom里添加函数create（）{} ，在main.js里dom.create()调用

```js
window.dom = {
    create(tagName) {
        return document.createElement(tagName);
    }
}

let div = dom.create('div');
console.log(div);
```

**创建div里包含span**

设置内容为string，返回孩子的第一个

但是不能创建tr、td,由于容器也是div，td只能在thead、tbody里

```js
create(string) {
        const container = document.createElement('div')
        container.innerHTML = string
        return container.children[0]
}
    
let div = dom.create('<div><span>2</span></div>');
console.log(div);
```

**template**

- 是可以放任意元素不出错的
- string.trim()把字符串两边空格去掉，防止返回的firstchild为空格文本
- container.content.firstChild返回值

```js
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }

let div = dom.create('<tr><td>2</td></tr>');
console.log(div);
```

#### 2.新增弟弟 after(node, node2) 

```js
after(node, node2) {
    //把node2插入到node的下一个节点的前面
        node.parentNode.insertBefore(node2, node.nextSibling);
    }


let div = dom.create('<div>newDIV</div>');
console.log(div);
dom.after(test, div)
```

当test没有下一个节点，无空格无回车，Format  on save,打出下一个节点为空

```
<div><div id="test">哈哈</div></div>
    
after(node, node2) {
    console.log(node.nextSibling)
    node.parentNode.insertBefore(node2, node.nextSibling);
}

<div>newDIV</div>
null
```

#### 3.新增哥哥  before(node, node2) 

```js
before(node, node2) {
    node.parentNode.insertBefore(node2, node);
}

let div = dom.create('<div>newDIV</div>');
console.log(div);
dom.before(test, div)
```

#### 4.新增孩子 append(parent, node)

```
append(parent, node) {
    parent.appendChild(node);
}

let div = dom.create('<div>newDIV</div>');
console.log(div);
dom.append(test, div)
```

![image-20200502221105530](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200502221105530.png)

#### 5.新增父亲 wrap(node, parent)

```
//用parent包住node
wrap(node, parent) {
    //把parent放在node上面，即哥哥
    dom.before(node, parent)
    //把node添加到添加到parent的下面
    dom.append(parent, node)
}

let div = dom.create('<div>newDIV</div>');
console.log(div);
dom.wrap(test, div)
```

![image-20200502221742888](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200502221742888.png)

## 删

#### 6.删除节点   dom.remove(node) 

return node 返回方便引用

```
remove(node) {
    node.parentNode.removeChild(node);
    return node
}

dom.remove(test)
```

#### 7.删除全部子节点 要遍历 dom.empty(node)   

包括空格文本子节点

```
//错误，由于在遍历时length在变化 
    empty(node) {
        //node.innerHTML = ''
        const {childNodes} = node
        const arr = []
        for (let i = 0; i < childNodes.length; i++) {
            dom.remove(childNodes[i])
            arr.push(childNodes[i])
        }
        //有时需要返回
        return arr
    }
```

**const childNodes=node.childNodes等价于const { childNodes } = node**

正确方法：while循环 

```
    empty(node) {
        //node.innerHTML = ''
        //const childNodes=node.childNodes
        const {
            childNodes
        } = node
        const arr = []
        let x = node.firstChild
        while (node.firstChild) {
            arr.push(dom.remove(x))
            x = node.firstChild
        }
        return arr
    }
    
  dom.empty(empty)  
  
<div id=empty>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

# 改

#### 8.读写属性 dom.attr(node,'title',?) 

```
<div id="test" title="I am Frank">哈哈</div>

attr(node, name, value) {
    node.setAttribute(name, value)
}

dom.attr(test, 'title', 'I am Frank')
```

**当长度为3时，用setAttribute写属性,长度为2时，用getAttribute读属性值**

```
attr(node, name, value) { //重载
    if (arguments.length === 3) {
        node.setAttribute(name, value)
    } else if (arguments.length === 2) {
        return node.getAttribute(name)
    }
}

dom.attr(test, 'title', 'I am Frank')
const title = dom.attr(test, 'title')
console.log(title)//读出title值
```

#### 9.读写文本内容 dom.text(node,string) 

用适配 长度为2是写，1是读

```
    text(node, string) { //适配
        if (arguments.length === 2) {
            if ('innerHTML' in node) {
                node.innerText = string //IE的
            } else {
                node.testContent = string //firefox、chrome
            }
        } else if (arguments.length === 1) {
            if ('innerHTML' in node) {
                return node.innerText //IE的
            } else {
                return node.testContent //firefox、chrome
            }
        }
    }

dom.text(test, '这是新的文本内容')
```

#### 10.读写标签内容 dom.html(node,string)

```
html(node, string) {
    if (arguments.length === 2) {
        node.innerHTML = string
    } else if (arguments.length === 1) {
        return node.innerHTML
    }
}

console.log(dom.html(test))//读
```

#### 11.改style  dom.style(node, Object)

- 用for循环遍历对象key,for (let key in Object)
- 把对象属性值赋给style  node.style[key] = Object[key]

```
style(node, Object) {
    for (let key in Object) {
        //key:color,border
        //node.style.color
        //node.style.border
        node.style[key] = Object[key]
    }
}

dom.style(test, {
    color: 'red',
    border: '1px solid red'
})
```

- 由于有三种情况，长度为3时写样式，长度为2时字符串是读，是对象就是写入多个

```
style(node, name, value) {
    if (arguments.length === 3) {
        //dom.style(div,'color','red')
        node.style[name] = value
    } else if (arguments.length === 2) {
        if (typeof name === 'string') {
            //dom.style(div,'color')
            return node.style[name]
        } else if (name instanceof Object) {
            //dom.style(div,{'color':'red'})
            const object = name
            for (let key in object) {
                //key:color,border
                //node.style.color
                //node.style.border
                node.style[key] = object[key]
            }
        }
    }
}

//加样式
dom.style(test, {
    color: 'red',
    border: '1px solid red'
})
//查找属性值
console.log(dom.style(test, 'color'))
```

#### 12.增class  dom.class.add(node,'blue')

#### 13.删class  dom.class.remove(node,'blue')

#### 14.查看class在不在  dom.class.contains(test, 'blue')  返回true/false

```html
class: {
    add(node, className) {
        node.classList.add(className)
    },
    remove(node, className) {
        node.classList.remove(className)
    },
    contains(node, className) {
//return值
        return node.classList.contains(className)
    },
}

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'red')
dom.class.contains(test, 'blue')
console.log(dom.class.contains(test, 'blue'))

<div id="test" class="red blue">哈哈</div>
```

#### 15.添加事件监听 dom.on(node, 'click', fn)

#### 16.删除事件监听 dom.off(node, 'click', fn)

```
on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
},
off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
},

fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)
```

# 查

```
console.log(dom.parent(test2))
console.log(dom.children(x))
console.log(dom.siblings(test2))
console.log(dom.siblings(test))
console.log(dom.siblings(test
```

#### 17.获取标签和标签们 dom.find('选择器') 

find是返回数组

- 当find里一个值时，获取标签

```
find(selector) {
    return document.querySelectorALL(selector)
}ALL

const testDiv = dom.find('#test')[0]
console.log(testDiv)
```

- 当find里两个值时，在指定便签里获取

- (scope || document) 是document为保底值

```
find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

得到<p class="red">红色</p>
```

#### 18.获取父元素 dom.parent(node)

```
parent(node) {
    return node.parentNode
},
```

#### 19.获取子元素 dom.children(node)

```
children(node) {
    return node.children
},
```

#### 20.获取兄弟姐妹 dom.siblings(node)

- **return Array.from(node.parentNode.children).filter(n => n !== node)** 排出掉自己.filter

```
siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
}
```

#### 21.获取弟弟 dom.next(node) 

**需要先判断下一个是否为空格文本或者空 ：while (x && x.nodeType === 3)**

```
next(node) {
    let x = node.nextSibling
    //判断下一个存在且是否为文本
    while (x && x.nodeType === 3) {
        x = x.nextSibling
    }
    return x
}
```

#### 22.获取哥哥 dom.previous(node) 

- 判断下一个存在且为文本时查找下一个值

```
(node) {
        let x = node.nextSibling
        //判断下一个存在且是否为文本
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
```

#### 23.遍历所有节点

- 先找到节点节点，查到所有所有子节点，执行箭头函数

```
each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, node.List[i])
    }
}

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
```

#### 24.判断节点排名老几

- 先获取父节点的所有孩子，为数组，再遍历数组，判断数组元素和node关系，返回需要的值，从0开始

```
index(node) {
    let arr = dom.children(node.parentNode)
    let i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === node) {
            break
        }
    }
    return i
}

console.log(dom.index(test2))
```

