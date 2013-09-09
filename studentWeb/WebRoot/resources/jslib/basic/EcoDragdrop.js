Ext.override(Ext.tree.TreeDragZone, {
	onInitDrag : function(e) {
		var data = this.dragData;
		this.tree.getSelectionModel().select(data.node);
		this.tree.eventModel.disable();
		this.proxy.update("");
		var clone = data.node.ui.elNode.cloneNode(true);
		Ext.fly(clone).setLeftTop(0, 0);
		this.proxy.el.position(null, 15010);
		this.proxy.update(clone);
		this.proxy.ghost.setStyle('background', '#c3daf9');
		this.tree.fireEvent("startdrag", this.tree, data.node, e);
	}
})
Ext.tree.EcoTreeDragZone = function(tree, el, config) {
	Ext.tree.TreeDragZone.superclass.constructor.call(this, el, config);
	this.tree = tree;
};
Ext.extend(Ext.tree.EcoTreeDragZone, Ext.tree.TreeDragZone, {
	onInitDrag : function(e) {
		var data = this.dragData;
		this.tree.getSelectionModel().select(data.node);
		this.tree.eventModel.disable();
		this.proxy.update("");
		var clone = data.node.ui.elNode.cloneNode(true);
		Ext.fly(clone).setLeftTop(0, 0);
		this.proxy.el.position(null, 15010);
		this.proxy.update(clone);
		this.proxy.ghost.setStyle('background', '#c3daf9');
		this.tree.fireEvent("startdrag", this.tree, data.node, e);
	}
});

Ext.tree.EcoTreeDropZone = function(tree, el, config) {
	Ext.tree.TreeDropZone.superclass.constructor.call(this, el, config);
	this.tree = tree;
	this.allowParentInsert = false;
	this.allowContainerDrop = false;
	this.appendOnly = false;

	this.dragOverData = {};
	this.lastInsertClass = "x-tree-no-status";
};
Ext.extend(Ext.tree.EcoTreeDropZone, Ext.tree.TreeDropZone, {});

Ext.override(Ext.tree.TreeEventModel, {
	getNode : function(e) {
		var t = this.tree.isEcoTree ? e.getTarget('.x-ecotree-econode', 3) : e
				.getTarget('.x-tree-node-el', 10);
		if (t) {
			var id = this.tree.isEcoTree ? t.id : Ext.fly(t, '_treeEvents')
					.getAttributeNS('ext', 'tree-node-id');
			if (id)
				return this.tree.getNodeById(id);
		}
		return null;
	},
	getNodeTarget : function(e) {
		var t = this.tree.isEcoTree ? e.getTarget('.x-ecotree-econode', 3) : e
				.getTarget('.x-tree-node-icon', 1);
		if (!t) {
			t = e.getTarget('.x-tree-node-el', 6);
		}
		return t;
	}
})