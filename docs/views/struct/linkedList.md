---
title: 链表 
sidebar: false
---

## api

- append（element）：向链表尾部添加一个新的项；
- insert（position，element）：向链表的特定位置插入一个新的项；
- get（position）：获取对应位置的元素；
- indexOf（element）：返回元素在链表中的索引。如果链表中没有该元素就返回-1；
- update（position，element）：修改某个位置的元素；
- removeAt（position）：从链表的特定位置移除一项；
- remove（element）：从链表中移除一项；
- isEmpty（）：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false；
- size（）：返回链表包含的元素个数，与数组的length属性类似；
- toString（）：由于链表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值；

## 代码实现

```js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(element) {
        let newNode = new Node(element);

        if (this.isEmpty()) {
            this.head = newNode;
        } else {
            let current = this.head;
            // 如果有指向下一个节点
            while (current.next) {
                current = current.next;
            }

            current.next = newNode;
        }
        this.length++;
    }

    isEmpty() {
        return this.length == 0 ? true : false;
    }

    toString() {
        let current = this.head;
        let result = ``;

        while (current) {
            result += current.data + `${current.next ? '->' : ''}`;
            current = current.next;
        }

        return result;
    }

    insert(position, element) {
        if (position < 0 || position > this.length) {
            return false;
        }
        let newNode = new Node(element);

        // 插入节点位置为0
        if (position == 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            // 情况2：插入位置position>0(该情况包含position=length)
            let index = 0
            let previous = null
            let current = this.head
            //步骤1：通过while循环使变量current指向position位置的后一个节点(注意while循环的写法)
            while (index++ < position) {
                //步骤2：在current指向下一个节点之前，让previous指向current当前指向的节点
                previous = current
                current = current.next
            }
            // 步骤3：通过变量current(此时current已经指向position位置的后一个节点)，使newNode指向position位置的后一个节点
            newNode.next = current
            //步骤4：通过变量previous，使position位置的前一个节点指向newNode
            previous.next = newNode
            /*
              启示：
              1.我们无法直接操作链表中的节点，但是可以通过变量指向这些节点，以此间接地操作节点(替身使者)；
              比如current指向节点3，想要节点3指向节点4只需要：current.next = 4即可。
              2.两个节点间是双向的，想要节点2的前一个节点为节点1，可以通过：1.next=2，来实现；
            */
        }
        //4.新节点插入后要length+1
        this.length += 1;
        return true
    }

    get(position) {
        if (position < 0 || position >= this.length) {
            return null;
        }

        let current = this.head;
        let index = 0;
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    indexOf(element) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.data == element) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    update(position, element) {
        if (position < 0 || position >= this.length) {
            return false
        };
        let current = this.head;
        let index = 0;
        while (index++ < position) {
            current = current.next;
        }
        current.data = element;
        return true;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) {
            return null;
        }
        let current = this.head;
        // 刪除第一个节点
        if (position == 0) {
            this.head = this.head.next;
        } else {
            let index = 0;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length--;
        return current.data;
    }

    remove(element) {
        let position = this.indexOf(element);
        return this.removeAt(position)
    }

    isEmpty() {
        return this.length == 0 ? true : false;
    }

    size() {
        return this.length;
    }
}
```