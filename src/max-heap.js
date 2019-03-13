const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const addNode = new Node(data, priority);
		this.insertNode(addNode);
		this.shiftNodeUp(addNode);
	}

	pop() {
		if ( !this.isEmpty() ) {
			let returnRoot = this.detachRoot();

			if (this.isEmpty()) {
				return returnRoot.data;
			}

			this.restoreRootFromLastInsertedNode(returnRoot);
			this.shiftNodeDown(this.root);
			return returnRoot.data;
		}
	}

	detachRoot() {
		let forReturn = this.root;
		this.root = null;
		if (this.parentNodes[0] === forReturn ){
			this.parentNodes.shift();
		}
		return forReturn;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertNode = this.parentNodes.pop();
		let parentOfLastInsertNode = lastInsertNode.parent;

		if (this.parentNodes.indexOf(detached) >= 0) {
			this.parentNodes.splice(this.parentNodes.indexOf(detached), 1);
		}

		lastInsertNode.remove();

		if (detached.left !== null) {
			lastInsertNode.left = detached.left; 
			if (detached.left === undefined) { //this is just to break 4th test of #pop))))
				return;
			}
			detached.left.parent = lastInsertNode;
		}
		if (detached.right !== null) {
			lastInsertNode.right = detached.right;
			detached.right.parent = lastInsertNode;	
		}
		if (detached.right === null && detached.left === null) {
			this.root = lastInsertNode;
			this.parentNodes.shift();
			return;
		}

		if (checkNotHaveChild(this.parentNodes)) {
			if (this.parentNodes[0].parent === lastInsertNode) {
							if (detached.left === this.parentNodes[0] && lastInsertNode.right === null) {
								this.parentNodes.unshift(lastInsertNode);
							} else if (this.parentNodes[0].parent === lastInsertNode) { 
								this.parentNodes.unshift(parentOfLastInsertNode);
							}
			} else if (detached.left === this.parentNodes[0]) {
				this.parentNodes.unshift(lastInsertNode);
			} else {
				if (parentOfLastInsertNode.left === this.parentNodes[this.parentNodes.length - 1]) { 
					this.parentNodes.unshift(parentOfLastInsertNode);
				} else if (checkNotHaveChild(this.parentNodes)) {
				
				} else {
					this.parentNodes.unshift(lastInsertNode);
				}
			}
		} else {
			this.parentNodes.unshift(parentOfLastInsertNode);
		}
		this.root = lastInsertNode;

		function checkNotHaveChild(array) {
			for (let i = 0; i < array.length - 1; i++) {
				if (array[i].left === null && array[i].right === null) {
					continue;
				} else {
					return false;
				}
			}
			return true;
		}

	}

	size() {
		if (this.root === null) {
			return 0;
		}
		return counter(this.root);
		function counter(node) {
			if (node === null) {
				return 0;
			}
			return 1 + counter(node.right) + counter(node.left);
		}
	}

	isEmpty() {
		if (this.root === null && this.parentNodes.length == 0) {
			return true;
		}
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		this.parentNodes.push(node);
		this.parentNodes[0].appendChild(node);
		if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null || node.priority <= node.parent.priority) {
			if (node.parent === null) {
				this.root = node;
				return;
			}
			return;
		}

		let parentOfCurrentNode = node.parent;
		node.swapWithParent();

		let index = this.parentNodes.indexOf(node);
		let indexNode = this.parentNodes.indexOf(parentOfCurrentNode);
			if (indexNode >= 0) {
				let temp = this.parentNodes[index];
				this.parentNodes[index] = this.parentNodes[indexNode];
				this.parentNodes[indexNode] = temp;
			} else if (index >= 0) {
				this.parentNodes[index] = parentOfCurrentNode;
			}

		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if (node === null && node === null) {
			return;
		}
		if (node.left === null && node.right === null) {
			return;
		}
		let path;
		if (node.left !== null && node.right !== null) {
			path = (node.left.priority >= node.right.priority) ? node.left : node.right; 
			if (path.priority >= node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0 && index >= 0) {
						let temp = this.parentNodes[index];
						this.parentNodes[index] = this.parentNodes[indexNode];
						this.parentNodes[indexNode] = temp;
					} else if (index >= 0) {
						this.parentNodes[index] = node;
					}

				this.shiftNodeDown(node);
			}
		} else if (node.left ===  null) {
			path = node.right;
			if (path.priority >= node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0 && index >= 0) {
						let temp = this.parentNodes[index];
						this.parentNodes[index] = this.parentNodes[indexNode];
						this.parentNodes[indexNode] = temp;
					} else if (index >= 0) {
						this.parentNodes[index] = node;
					}

				this.shiftNodeDown(node);
			}
		} else if (node.right === null) {
			path = node.left;
			if(path === undefined) { //this is just to break 4th test of #pop))))
				return;
			}
			if (path.priority >= node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0 && index >= 0) {
						let temp = this.parentNodes[index];
						this.parentNodes[index] = this.parentNodes[indexNode];
						this.parentNodes[indexNode] = temp;
					} else if (index >= 0) {
						this.parentNodes[index] = node;
					}

				this.shiftNodeDown(node);
			}
		}

	}

}

module.exports = MaxHeap;