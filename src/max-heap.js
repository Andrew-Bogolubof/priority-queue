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
			// console.log(this.root.priority, ' ', this.root.data);
			let returnRoot = this.detachRoot();
			// console.log(returnRoot.priority, ' and data ', returnRoot.data);
			// console.log('size of this is ', this.size(), ' is empty ', this.isEmpty());
			// console.log(this);

			// this.restoreRootFromLastInsertedNode(returnRoot);
			if (this.isEmpty()) {
				// console.log('HEY MAN');
				return returnRoot.data;
			}

			this.restoreRootFromLastInsertedNode(returnRoot);

			// console.log('After tree has benn restored');
			// for (let i = 0; i < q.parentNodes.length; i++)
			// 	console.log(q.parentNodes[i]);
			// console.log('end');

			// console.log('After tree has benn restored', this.root.priority, ' and data ', this.root.data);
			this.shiftNodeDown(this.root);
			// console.log('After shift node down');
			// for (let i = 0; i < q.parentNodes.length; i++)
			// 	console.log(q.parentNodes[i]);
			// console.log('end');
			
			// console.log('and new root is down ', this.root.priority, ' and data ', this.root.data);
			return returnRoot.data;
		}
	}

	detachRoot() {
		// console.log('HEY FLUFFY');
		let forReturn = this.root;
		// console.log('in detach ', this.root);
		this.root = null;
		// console.log('in detach ', this.root);
		if (this.parentNodes[0] === forReturn ){
			// console.log("hey here the problem ", this.parentNodes);
			this.parentNodes.shift();
		}
		return forReturn;
	}


	restoreRootFromLastInsertedNode(detached) {
		// console.log('in the begin of the method\n');
		// for (let i = 0; i < this.parentNodes.length; i++)
		// 	console.log('hey _________ ', this.parentNodes[i].priority);
		// console.log('end_________________________________________________')
		// if (this.size() == 0) {
		// 	return;
		// }




		// let index = this.parentNodes.indexOf(detached);
		// 	if (index >= 0) {
		// 		this.parentNodes.shift();
		// 		this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
		// 	} else if (this.parentNodes[this.parentNodes.length - 1].parent === detached){
		// 		this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
		// 	} else if (this.parentNodes[0].parent === detached) { //!HERE A PROBLEM 
		// 			// this.parentNodes.shift();
		// 	} else {	
		// 		this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1].parent);
		// 	} 
		let lastInsertNode = this.parentNodes.pop();
		//!
		let parentOfLastInsertNode = lastInsertNode.parent;
		//!

		//!This is a plunge of mistake
		if (this.parentNodes.indexOf(detached) >= 0) {
			this.parentNodes.splice(this.parentNodes.indexOf(detached), 1);
		}


		//!
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
							} else if (this.parentNodes[0].parent === lastInsertNode) { //I add this stuff from else
								this.parentNodes.unshift(parentOfLastInsertNode);
							}
			} else if (detached.left === this.parentNodes[0]) {
				this.parentNodes.unshift(lastInsertNode);
			} else {
				if (parentOfLastInsertNode.left === this.parentNodes[this.parentNodes.length - 1]) { //!DUNNO WHAT
					this.parentNodes.unshift(parentOfLastInsertNode);
				} else if (checkNotHaveChild(this.parentNodes)) {
				
				} else {
					this.parentNodes.unshift(lastInsertNode);
				}
			}
		} else {
			this.parentNodes.unshift(parentOfLastInsertNode);
		}
		// if (detached.left !== null) {
		// 	lastInsertNode.left = detached.left; 
		// 	detached.left.parent = lastInsertNode;
		// }
		// if (detached.right !== null) {
		// 	lastInsertNode.right = detached.right;
		// 	detached.right.parent = lastInsertNode;	
		// }
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
		// for (let i = 0; i < this.parentNodes.length; i++)
		// console.log('hey _________ ', this.parentNodes[i].priority);
		// console.log('end_________________________________________________')
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
		// console.log('This is insert method ', this.parentNodes[0], '______end_______');
		if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
			this.parentNodes.shift();
			// console.log('This is insert method ', this.parentNodes[0].priority, '______end_______');
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
			path = (node.left.priority >= node.right.priority) ? node.left : node.right; //!Maybe here the  problem with equal priority
			// console.log(path.priority);
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

q = new MaxHeap();
const expectedData = [3, 5, 1, 0, 4, 2];

q.push(0, 10);
q.push(1, 15);
q.push(2, 4);
q.push(3, 17);
q.push(4, 6);
q.push(5, 17);

console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());