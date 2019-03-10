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
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
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
		
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		this.parentNodes.push(node);
		let length = this.parentNodes.length;
		let parent = Math.floor( (length - 2) / 2 );
		this.parentNodes[parent].appendChild(node);
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
