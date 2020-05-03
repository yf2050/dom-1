window.dom = {
    // create(tagName) {
    //     return document.createElement(tagName);
    // }

    // create(string) {
    //     const container = document.createElement('div')
    //     container.innerHTML = string
    //     return container.children[0]
    // },


    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },

    after(node, node2) {
        console.log(node.nextSibling)
        node.parentNode.insertBefore(node2, node.nextSibling);
    },

    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },

    append(parent, node) {
        parent.appendChild(node);
    },

    //用parent包住node
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },

    remove(node) {
        node.parentNode.removeChild(node);
        return node
    },

    // empty(node) {
    //     //node.innerHTML = ''
    //     const {
    //         childNodes
    //     } = node
    //     const arr = []
    //     for (let i = 0; i < childNodes.length; i++) {
    //         dom.remove(childNodes[i])
    //         arr.push(childNodes[i])
    //     }
    //     return arr
    // }


    //用while循环做
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
    },

    attr(node, name, value) { //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },

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
    },

    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },



    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        contains(node, className) {
            return node.classList.contains(className)
        }
    },

    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },



    parent(node) {
        return node.parentNode
    },

    children(node) {
        return node.children
    },

    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },

    next(node) {
        let x = node.nextSibling
        //判断下一个存在且是否为文本
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },

    previous(node) {
        let x = node.previousSibling
        //判断下一个存在且是否为文本
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },

    index(node) {
        let arr = dom.children(node.parentNode)
        let i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === node) {
                break
            }
        }
        return i
    },

    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },

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
    },

    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
}