// let div = dom.create('<div>newDIV</div>');
// console.log(div);
//dom.wrap(test, div)
//dom.remove(test)
//dom.empty(empty)
// dom.attr(test, 'title', 'I am Frank')
// const title = dom.attr(test, 'title')
// console.log(title)
//dom.text(test, '这是新的文本内容')
//console.log(dom.html(test))
// dom.style(test, {
//     color: 'red',
//     border: '1px solid red'
// })
// console.log(dom.style(test, 'color'))
// dom.class.add(test, 'red')
// dom.class.add(test, 'blue')
// dom.class.remove(test, 'red')
// console.log(dom.class.contains(test, 'blue'))
// fn = () => {
//     console.log('点击了')
// }
// dom.on(test, 'click', fn)
// dom.off(test, 'click', fn)
// const testDiv = dom.find('#test')[0]
// const test2 = dom.find('#test2')[0]
// console.log(dom.find('.red', test2)[0])
// console.log(dom.parent(test2))
// console.log(dom.children(x))
// console.log(dom.siblings(test2))
// console.log(dom.siblings(test))
// console.log(dom.siblings(test2))
// const t = dom.find('#travel')[0]
// dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
// console.log(dom.index(test2))

const div = dom.find('#test>.red')[0] // 获取对应的元素
dom.style(div, 'color', 'red') // 设置 div.style.color
const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)) // 遍历 divList 里的所有元素