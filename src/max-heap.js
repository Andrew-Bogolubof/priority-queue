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
			this.restoreRootFromLastInsertedNode(returnRoot);
			this.shiftNodeDown();
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

		// for (let i = 0; i < this.parentNodes.length; i++)
		// console.log('hey _________ ', this.parentNodes[i].priority);


		let lastInsertNode = this.parentNodes.pop();
		let parentOfLast = lastInsertNode.parent;
		lastInsertNode.remove();
		// console.log('hey _________ ', parentOfLast.priority, ' and last insert is ', lastInsertNode.priority);
		if (parentOfLast === detached) {
			this.parentNodes.unshift(lastInsertNode);
			// console.log('HERE A PROBLEM');
		} else if (isAbsRight(lastInsertNode) && lastInsertNode.parent !== detached) { //!here should be condition of the absoute right element
			// console.log('HEY I AM HERE');
			this.parentNodes.unshift(parentOfLast);
		} 
		if (detached.left !== null) {
			lastInsertNode.left = detached.left; 
			detached.left.parent = lastInsertNode;
		}
		if (detached.right !== null) {
			lastInsertNode.right = detached.right;
			detached.right.parent = lastInsertNode;	
		}
		this.root = lastInsertNode;

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

		return this.parentNodes.lenght;
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
			}
			if (this.parentNodes.length > 1 && node.parent === null) {
				this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0];
				this.parentNodes[0] = this.parentNodes[0].parent;
			} else if (this.parentNodes.length > 1 && node.priority < node.parent.priority && this.parentNodes[0].parent !== this.root) {
				if( isAbsRight(node) && node.parent !== this.root) { //!!!!!BULL SHIT FUCKER условие абсолютно правого элемента
					// console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ', node.priority);
					this.parentNodes.unshift();
				} else {
					this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0];
					this.parentNodes[0] = this.parentNodes[0].parent;
				}
			}
			// console.log('This is shift up method ', this.parentNodes[0].priority, '______end_______');
			return;
		}
		node.swapWithParent();
		this.shiftNodeUp(node);

		function isAbsRight(node) {
			if (node.parent === null) {
				return true;
			}
			if (node.parent.right == node) {
				return isAbsRight(node.parent);
			} else {
				return false;
			}
		}
	}
	// if (node.priority < node.parent.priority) {
	// 	if (node.parent === null) {
	// 		this.root = node;
	// 	}
	// 	if (this.parentNodes.length > 1) {
	// 		this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0];
	// 		this.parentNodes[0] = this.parentNodes[0].parent;
	// 	}
	// 	return;
	// }
	shiftNodeDown(node) {

	}

}

module.exports = MaxHeap;
