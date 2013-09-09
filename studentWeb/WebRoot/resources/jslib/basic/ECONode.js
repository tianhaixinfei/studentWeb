Ext.tree.ECONode = function(attributes) {
	this.defaultUI = Ext.tree.ECOTreeNodeUI;
	Ext.tree.ECONode.superclass.constructor.apply(this, arguments);
	this.expanded = (attributes.expanded !== false);
};
Ext.extend(Ext.tree.ECONode, Ext.tree.TreeNode, {
	x : 0,
	y : 0,
	prelim : 0,
	modifier : 0,
	width : 80,
	height : 40,
	leftNeighbor : null,
	rightNeighbor : null,
	isEcoTreeNode:true,
	init : function() {
		this.x = 0;
		this.y = 0;
		this.prelim = 0;
		this.modifier = 0;
		this.leftNeighbor = null;
		this.rightNeighbor = null;
		this.width= this.attributes.width||this.width;
		this.height=this.attributes.height||this.height;		
	},
	isParentCollapse : function() {
		var node = this;
		while (node.parentNode) {
			var node = node.parentNode;
			if (node.expanded == false)
				return true;
		}
		return false;
	},
	render : function(bulkRender) {
		this.ui.render();
		if (!this.rendered) {
			// alert(this.id);
			this.getOwnerTree().registerNode(this);
			this.rendered = true;
		}
		if (this.expanded == true) {
			for (var i = 0; i < this.childNodes.length; i++) {
				this.childNodes[i].render();
			}
			this.renderIndent();
		}
	},	
	 
	renderIndent : function() {
		this.ui.renderIndent();
	},
	getChildrenCount : function() {
		if (this.isLeaf())
			return 0;
		if (!this.expanded)
			return 0;
		return this.childNodes.length;
	},
	appendChild : function(n) {
		var node = Ext.tree.TreeNode.superclass.appendChild.call(this, n);
		if (this.getOwnerTree()) {
			this.getOwnerTree().draw();
		}
		return node;
	},
	removeChild : function(node) {
		this.ownerTree.getSelectionModel().unselect(node);
		Ext.tree.TreeNode.superclass.removeChild.apply(this, arguments);
		if (this.getOwnerTree()) {
			this.getOwnerTree().draw();
		}
		return node;
	},
	insertBefore : function(node, refNode) {
		var newNode = Ext.tree.TreeNode.superclass.insertBefore.apply(this,
				arguments);
		if (this.getOwnerTree()) {
			this.getOwnerTree().draw();
		}
		return newNode;
	},
	getChildrenCenter : function() {
		var f = this.firstChild, l = this.lastChild;
		var tree = this.getOwnerTree();
		return f.prelim + ((l.prelim - f.prelim) + tree.getNodeSize(l)) / 2;
	}
});
Ext.tree.ECOTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	render : function(bulkRender) {
		var n = this.node, a = n.attributes;
		var tree = this.node.getOwnerTree();
		switch (tree.iRootOrientation) {
			case 'right' :
				n.x = tree.maxX + n.x + tree.bottomXAdjustment;
				n.y = tree.maxY + n.y + tree.bottomYAdjustment;
				// alert(n.x+" "+n.y+" "+tree.maxX+" "+tree.maxY);
				break;
			case 'bottom' :
				n.x = tree.maxX + n.x + tree.bottomXAdjustment;
				n.y = tree.maxY + n.y + tree.bottomYAdjustment;
				// alert(n.x+" "+n.y+" "+tree.maxX+" "+tree.maxY);
				break;
		}
		var targetNode = n.parentNode
				? n.parentNode.ui.getContainer()
				: n.ownerTree.innerCt.dom;
		this.rendered = true;
		this.renderElements(n, a, targetNode, bulkRender);
		this.initEvents();

	},
	roundedRect : function(tree, node) {
		var color = node.color || tree.nodeColor;
		var border = node.borderColor || tree.nodeBorderColor;
		var x = node.x, y = node.y, w = node.width, h = node.height;
		var r = node.radius || tree.nodeRadius || 5, ctx = tree.ctx;
		ctx.save();
		ctx.strokeStyle = border;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y + r);
		ctx.lineTo(x, y + h - r);
		ctx.quadraticCurveTo(x, y + h, x + r, y + h);
		ctx.lineTo(x + w - r, y + h);
		ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
		ctx.lineTo(x + w, y + r);
		ctx.quadraticCurveTo(x + w, y, x + w - r, y);
		ctx.lineTo(x + r, y);
		ctx.quadraticCurveTo(x, y, x, y + r);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	},
	renderElements : function(n, a, targetNode, bulkRender) {
		var tree = this.node.getOwnerTree();
		this.roundedRect(tree, this.node);
		this.renderText(tree, this.node);
	},
	renderText : function(tree, node) {
		var eimg = node.collapsedImage || tree.collapsedImage;
		var cimg = node.expandedImage || tree.expandedImage;
		this.wrap = tree.textEl.createChild( {
			tag : 'div',
			style : 'position: absolute;text-overflow: clip;',
			cls : 'x-ecotree-econode',
			id : node.id,
			name : node.id
		});
		this.wrap.setSize(node.width, node.height);
		this.textWrap = this.wrap.createChild( {
			tag : 'div',
			cls : 'x-ecotree-textwrap'
		});
		if (node.isExpandable()) {
			this.ecNode = tree.textEl.createChild( {
				tag : 'img',
				src : (node.expanded) ? cimg : eimg,
				style : 'position:absolute'
			});
			// this.ecNode.on('click', this.toggleNode
			// .createDelegate(this, [node]));
			this.ecNode.on('click', node.toggle, node);
		} else {
			this.ecNode = tree.textEl.createChild( {
				tag : 'span',
				style : 'position:absolute'
			});
		}
		if (node.href) {
			this.linkNode = this.textWrap.createChild( {
				tag : 'a',
				href : node.href
			});
			this.linkNode.createChild(node.text);
		} else {
			this.textWrap.createChild(node.text)
		}
		Ext.fly(this.textWrap).unselectable();
		this.textNode = this.textWrap.dom;
		var textWH = this.textWrap.getSize();
		var x = node.x;
		var y = node.y;
		this.wrap.setLeftTop(x, y);
		this.elNode = this.wrap.dom;
		this.anchor = this.elNode;
		var xy = this.getJoinPoint(tree, node);
		this.ecNode.setLeftTop(xy[0] - (this.ecNode.getWidth() || 0) / 2, xy[1]
				- (this.ecNode.getHeight() || 0) / 2);
	},

	collapse : function() {
		this.node.expanded = false;
		this.node.getOwnerTree().draw();
	},
	animCollapse : function() {
		this.collapse();
	},
	animExpand : function(callback) {
		this.expand();
	},
	expand : function() {
		this.node.expanded = true;
		this.node.getOwnerTree().draw();
	},
	toggleNode : function(node, e) {
		if (node.expanded == false)
			node.expanded = true;
		else if (node.expanded == true)
			node.expanded = false;
		node.getOwnerTree().draw();
	},
	calJoin : function() {
	},
	getDDRepairXY : function() {
		return Ext.lib.Dom.getXY(this.elNode);
	},
	getJoinPoint : function(tree, node) {
		var xa = 0, ya = 0;
		switch (tree.iRootOrientation) {
			case 'top' :
				xa = node.x + (node.width / 2);
				ya = node.y + node.height;// bc
				break;
			case 'bottom' :
				xa = node.x + (node.width / 2);
				ya = node.y;// tc
				break;
			case 'right' :
				xa = node.x;
				ya = node.y + (node.height / 2);// lc
				break;
			case 'left' :
				xa = node.x + node.width;
				ya = node.y + (node.height / 2);// rc
				break;
		}
		return [xa, ya];
	},
	getJoinLinePoint : function(tree, child, xa, ya,xb,yb,xc,yc,xd,yd) {	
		var halfSep=tree.iLevelSeparation / 2;
		switch (tree.iRootOrientation) {
			case 'top' :
				xd = xc = child.x + (child.width / 2); // tc
				yd = child.y;
				xb = xa;
				switch (tree.iNodeJustification) { // 在父子节点的中间 Y坐标上。
					case 'top' :
						yb = yc = yd - halfSep;
						break;
					case 'bottom' :
						yb = yc = ya + halfSep; //
						break;
					case 'center' :
						yb = yc = ya + (yd - ya) / 2;
						break;
				}
				break;

			case 'bottom' :
				xd = xc = child.x + (child.width / 2);
				yd = child.y + child.height;
				xb = xa;
				switch (tree.iNodeJustification) {
					case 'top' :
						yb = yc = yd + halfSep;
						break;
					case 'bottom' :
						yb = yc = ya - halfSep;
						break;
					case 'center' :
						yb = yc = yd + (ya - yd) / 2;
						break;
				}
				break;

			case 'right' :
				xd = child.x + child.width;
				yd = yc = child.y + (child.height / 2);
				yb = ya;
				switch (tree.iNodeJustification) {
					case 'top' :
						xb = xc = xd + halfSep;
						break;
					case 'bottom' :
						xb = xc = xa - halfSep;
						break;
					case 'center' :
						xb = xc = xd + (xa - xd) / 2;
						break;
				}
				break;

			case 'left' :
				xd = child.x;
				yd = yc = child.y + (child.height / 2);
				yb = ya;
				switch (tree.iNodeJustification) {
					case 'top' :
						xb = xc = xd - halfSep;
						break;
					case 'bottom' :
						xb = xc = xa + halfSep;
						break;
					case 'center' :
						xb = xc = xa + (xd - xa) / 2;
						break;
				}
				break;
		}
		return [xa, ya, xb, yb, xc, yc, xd, yd];
	},
	renderIndent : function() {
		var node = this.node, tree = node.getOwnerTree(), child = null;
		var point = this.getJoinPoint(tree, node), xa = point[0], ya = point[1];
		var xb = 0, yb = 0, xc = 0, yc = 0, xd = 0, yd = 0;
		for (var k = 0; k < node.childNodes.length; k++) {// 所有子节点
			child = node.childNodes[k];
			var p=this.getJoinLinePoint(tree,child,xa, ya, xb, yb, xc, yc, xd, yd);		
			this.drawJoinLine(tree, node, p[0],p[1],  p[2],  p[3],  p[4], p[5],  p[6], p[7]);
		}
	},
	drawJoinLine : function(tree, node, xa, ya, xb, yb, xc, yc, xd, yd) {
		var ctx = tree.ctx;
		ctx.save();
		ctx.strokeStyle = node.joinLineStyle || tree.joinLineStyle || 'black';
		ctx.beginPath();
		switch (tree.linkType) {
			case "M" :
				ctx.moveTo(xa, ya);
				ctx.lineTo(xb, yb);
				ctx.lineTo(xc, yc);
				ctx.lineTo(xd, yd);
				break;
			case "B" :
				ctx.moveTo(xa, ya);
				ctx.bezierCurveTo(xb, yb, xc, yc, xd, yd);
				break;
		}
		ctx.stroke();
		ctx.restore();
	},
	
	getDDHandles : function() {
		return [this.textNode, this.elNode];
	},
	onMove : function(tree, node, oldParent, newParent, index, refNode) {
	},
	onSelectedChange : function(state) {
		if (state) {
			this.focus();
			this.addClass("x-ecotree-selected");
		} else {
			// this.blur();
			this.removeClass("x-ecotree-selected");
		}
	}
});
