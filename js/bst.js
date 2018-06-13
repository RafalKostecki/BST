class BST {
  constructor(rootKey) {
    this.root = null;

    this.nodes = [];
  };

  addNode(nodeKey) {
    let node = {
      key: nodeKey,
      parent: null,
      left: null,
      right: null
    };
    this.nodes.push(node);

    let currentNode = this.root;
    let copyCurrentNode = null;
    while (currentNode !== null) {
      copyCurrentNode = currentNode;

      if (node.key < currentNode.key) {
        currentNode = currentNode.left;
      }
      else currentNode = currentNode.right;
    }
    node.parent = copyCurrentNode;

    if (copyCurrentNode === null) this.root = node; //If root doesn`t exists
    else if (node.key < copyCurrentNode.key) copyCurrentNode.left = node;
    else copyCurrentNode.right = node;

  };

  deleteNode(nodeKey) {
    let node = null;
    for (let i=0; i<this.nodes.length; i++) {
      if (this.nodes[i].key === nodeKey) {
        node = this.nodes[i];
        this.nodes.splice(i, 1);
      }
      else if (i===this.nodes.length-1 && node === null) throw new Error('Cannot find node.')
    }
    

    if (node.left === null) {
      this.transplant(node, node.right);
    }
    else if (node.right === null) {
      this.transplant(node, node.left);
    }
    else {
      let y = this.minimum(node.right);
      if (y.parent !== node) {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }
      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
    }
  };

  transplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    }
    else if (u === u.parent.left) {
      u.parent.left = v;
    }
    else {
      u.parent.right = v;
    }
    if (v !== null) {
      v.parent = u.parent;
    }
  };

  minimum(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  };

  maximum(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  };

}

let myBST = new BST;
