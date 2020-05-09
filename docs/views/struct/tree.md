---
title: 树
sidebar: false
date: 2020-04-20
tags:
 - struct
categories:
 - struct
---

## api

- insert（key）：向树中插入一个新的键；
- search（key）：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false；
- inOrderTraverse：通过中序遍历方式遍历所有节点；
- preOrderTraverse：通过先序遍历方式遍历所有节点；
- postOrderTraverse：通过后序遍历方式遍历所有节点；
- min：返回树中最小的值/键；
- max：返回树中最大的值/键；
- remove（key）：从树中移除某个键；

## 树的遍历方式

- 先序遍历 根左右
- 中序遍历 左根右
- 后序遍历 左右根

## 代码实现

```js
class Node {
    constructor(key) {
        this.left = null;
        this.right = null;
        this.key = key;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    preOrderTraversal(handler) {
        this.preOrderTraversalNode(this.root, handler);
    }

    preOrderTraversalNode(node, handler) {
        if (node !== null) {
            handler(node.key);
            // 遍历左子树
            this.preOrderTraversalNode(node.left, handler);
            this.preOrderTraversalNode(node.right, handler);
        }
    }

    midOrderTraversal(handler) {
        this.midOrderTraversalNode(this.root, handler);
    }

    midOrderTraversalNode(node, handler) {
        if (node !== null) {
            this.midOrderTraversalNode(node.left, handler);
            handler(node.key)
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    postOrderTraversal(handler) {
        this.postOrderTraversalNode(this.root, handler);
    }

    postOrderTraversalNode(node, handler) {
        if (node !== null) {
            this.postOrderTraversalNode(node.left, handler);
            this.postOrderTraversalNode(node.right, handler);
            handler(node.key)
        }
    }

    insert(key) {
        let newNode = new Node(key);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        // 当newNode.key < node.key, 向左查找
        if (newNode.key < node.key) {
            // 1. 无左子节点，直接插入
            if (node.left == null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right == null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    max() {
        let node = this.root;
        let key = null;
        while (node !== null) {
            key = node.key;
            node = node.right;
        }
        return key;
    }

    min() {
        let node = this.root;
        let key = null;
        while (node !== null) {
            key = node.key;
            node = node.left;
        }
        return key;
    }

    search(key) {
        let node = this.root;
        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        let current = this.root;
        let parent = null;
        let isLeftChild = true;
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            if (current == null) {
                return false;
            }
        }
        // 找到节点了，进行删除
        if (current.left == null && current.right == null) {
            // 1. 没有节点
            if (current == this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        } else if (current.left == null || current.right == null) {
            // 2. 存在一个子节点, 左子树节点
            if (current.right == null) {
                if (current == this.root) {
                    this.root = current.left;
                } else if (isLeftChild) {
                    parent.left = current.left;
                } else {
                    parent.right = current.left;
                }
            } else {
                if (current == this.root) {
                    this.root = current.right;
                } else if (isLeftChild) {
                    parent.left = current.right;
                } else {
                    parent.right = current.right;
                }
            }
        } else {
            // 3. 存在两个节点
            let successor = this.getSuccessor(current)
            //2.判断是否根节点
            if (current == this.root) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }

            //3.将后继的左子节点改为被删除节点的左子节点
            successor.left = current.left
        }
    }

    getSuccessor(delNode) {
        //1.定义变量,保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        //2.循环查找current的右子树节点
        while (current != null) {
            successorParent = successor
            successor = current
            current = current.left
        }

        //3.判断寻找到的后继节点是否直接就是删除节点的right节点
        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}
```