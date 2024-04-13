// script.js
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
        this.svg = document.getElementById('bstSvg');
        this.svgNS = 'http://www.w3.org/2000/svg';
        this.nodeRadius = 20;
        this.horizontalSpacing = 40;
        this.verticalSpacing = 60;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.visualize();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
        this.visualize();
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            const minRight = this.findMinNode(node.right);
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    visualize() {
        this.svg.innerHTML = '';
        if (!this.root) return;

        this.drawNode(this.root, 400, 30, 1);
    }

    drawNode(node, x, y, level) {
        const circle = document.createElementNS(this.svgNS, 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', this.nodeRadius);
        circle.setAttribute('fill', '#3498db');
        circle.setAttribute('stroke', '#2980b9');
        this.svg.appendChild(circle);

        const text = document.createElementNS(this.svgNS, 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.textContent = node.value;
        this.svg.appendChild(text);

        if (node.left) {
            const childX = x - this.horizontalSpacing * Math.pow(2, level - 1);
            const childY = y + this.verticalSpacing;
            this.drawNode(node.left, childX, childY, level + 1);

            const line = document.createElementNS(this.svgNS, 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', y + this.nodeRadius);
            line.setAttribute('x2', childX + this.nodeRadius);
            line.setAttribute('y2', childY - this.nodeRadius);
            line.setAttribute('stroke', '#2980b9');
            this.svg.appendChild(line);
        }

        if (node.right) {
            const childX = x + this.horizontalSpacing * Math.pow(2, level - 1);
            const childY = y + this.verticalSpacing;
            this.drawNode(node.right, childX, childY, level + 1);

            const line = document.createElementNS(this.svgNS, 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', y + this.nodeRadius);
            line.setAttribute('x2', childX - this.nodeRadius);
            line.setAttribute('y2', childY - this.nodeRadius);
            line.setAttribute('stroke', '#2980b9');
            this.svg.appendChild(line);
        }
    }
}

const bst = new BST();

function insertNode() {
    const nodeValueInput = document.getElementById('nodeValue');
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        bst.insert(value);
        nodeValueInput.value = '';
    } else {
        alert('Please enter a valid number.');
    }
}

function deleteNode() {
    const deleteValueInput = document.getElementById('deleteValue');
    const value = parseInt(deleteValueInput.value);
    if (!isNaN(value)) {
        bst.delete(value);
        deleteValueInput.value = '';
    } else {
        alert('Please enter a valid number.');
    }
}
