class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		} 
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
			return node;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
			return node;
		} else 
		return error;

	}

	remove() {
		if (this.parent != null)
			this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent !== null) {
			let child = this;
			let parent = child.parent;
			let root = this.parent.parent;

			let childLeft = (child.left === null) ? null : child.removeChild(child.left);
			let childRight = (child.right === null) ? null : child.removeChild(child.right);

			if (root !== null ) {
				root.removeChild(parent);
				root.appendChild(child);
			} else {
				child.parent = null;
			}

			if (parent.left === child) {
				let parentChild = (parent.right === null) ? null : parent.removeChild(parent.right);
				child.appendChild(parent);
				(parentChild === null) ? child.right = null : child.appendChild(parentChild);
			} else if (parent.right === child) {
				let parentChild = (parent.left === null) ? null : parent.removeChild(parent.left);
				(parentChild === null) ? child.left = null : child.appendChild(parentChild);
				child.appendChild(parent);
			}
			parent.left = null; parent.right = null;

			(childLeft === null) ? parent.left = null : parent.appendChild(childLeft);
			(childRight=== null) ? parent.right = null : parent.appendChild(childRight);
		}
	}
}

module.exports = Node;
