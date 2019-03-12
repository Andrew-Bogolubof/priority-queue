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

		// for (let i = 0; i < this.parentNodes.length; i++)
		// console.log('PUSH_________', this.parentNodes[i].priority);
		// console.log('___________end_______________');
	}

	pop() {
		if ( !this.isEmpty() ) {
			let returnRoot = this.detachRoot();
			console.log(returnRoot.priority, ' and data ', returnRoot.data);
			if (this.isEmpty()) {
				return returnRoot.data;
			}
			this.restoreRootFromLastInsertedNode(returnRoot);
			console.log('After tree has benn restored', this.root.priority, ' and data ', this.root.data);
			this.shiftNodeDown(this.root);
			console.log('and new root is down ', this.root.priority, ' and data ', this.root.data);
			return returnRoot.data;
		}
	}

	detachRoot() {
		let forReturn = this.root;
		this.root = null;
		if (this.parentNodes[0] === forReturn ){
			// console.log("hey here the problem ", this.parentNodes);
			this.parentNodes.shift();
		}
		return forReturn;
	}


	restoreRootFromLastInsertedNode(detached) {
		for (let i = 0; i < this.parentNodes.length; i++)
			console.log('hey _________ ', this.parentNodes[i].priority);
		console.log('end_________________________________________________')

		let index = this.parentNodes.indexOf(detached);
			if (index >= 0) {
				this.parentNodes.shift();
				this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
			} else if (this.parentNodes[this.parentNodes.length - 1].parent === detached){
				this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
			} else if (this.parentNodes[0].parent === detached) {
					// this.parentNodes.shift();
			} else {
				this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1].parent);
		}


		let lastInsertNode = this.parentNodes.pop();
		// let parentOfLast = lastInsertNode.parent;
		lastInsertNode.remove();

		// console.log('hey _________ ', parentOfLast.priority, ' and last insert is ', lastInsertNode.priority);
		// if (parentOfLast === detached) {
		// 	this.parentNodes.unshift(lastInsertNode);
		// 	// console.log('HERE A PROBLEM');
		// } else if (isAbsRight(lastInsertNode) && lastInsertNode.parent !== detached) {
		// 	// console.log('HEY I AM HERE');
		// 	this.parentNodes.unshift(parentOfLast);
		// } 

		if (detached.left !== null) {
			lastInsertNode.left = detached.left; 
			detached.left.parent = lastInsertNode;
		}
		if (detached.right !== null) {
			lastInsertNode.right = detached.right;
			detached.right.parent = lastInsertNode;	
		}

		this.root = lastInsertNode;

		for (let i = 0; i < this.parentNodes.length; i++)
		console.log('hey _________ ', this.parentNodes[i].priority);
		console.log('end_________________________________________________')


		function isAbsRight(node) {
			if (node.parent === null ) {
				return true;
			}
			if (node.parent.right == node) {
				return isAbsRight(node.parent);
			} else {
				return false;
			}
		}
	}

	size() {
		if (this.root === null) {
			return 0;
		}
		return counter(this.root);
		function counter(node) {
			if (node.left === null && node.right === null) {
				return 1;
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
		// console.log('This is insert method ', this.parentNodes[0], '______end_______');
		if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
			this.parentNodes.shift();
			// console.log('This is insert method ', this.parentNodes[0].priority, '______end_______');
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null || node.priority < node.parent.priority) {
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
		// console.log(node.priority, ' and parent ', node.parent);
		// for (let i = 0; i < this.parentNodes.length; i++) 
		// 	console.log(this.parentNodes[i].priority);
		// console.log('end');
		if (node === null && node === null) {
			return;
		}
		if (node.left === null && node.right === null) {
			return;
		}
		let path;
		if (node.left !== null && node.right !== null) {
			path = (node.left.priority > node.right.priority) ? node.left : node.right;
			// console.log(path.priority);
			if (path.priority > node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0) {
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
			if (path.priority > node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0) {
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
			if (path.priority > node.priority) {
				if (this.root === node) {
					this.root = path;
				} 
				path.swapWithParent();

				let index = this.parentNodes.indexOf(path);
				let indexNode = this.parentNodes.indexOf(node);
					if (indexNode >= 0) {
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
