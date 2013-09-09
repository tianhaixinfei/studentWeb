Ext.tree.ECOTree = Ext.extend(Ext.tree.TreePanel, {
	
	/**
	 * 1、连接线、节点、边距的设置
	 * @type Number
	 */
	iMaxDepth : 100,//最大深度
	iLevelSeparation : 40,//上下节点距离
	iSiblingSeparation : 40,//同级节点左右距离
	iSubtreeSeparation : 20,//子节点左右距离

	iRootOrientation : 'top',//根节点上下方位-左右
	iNodeJustification : 'top',//子节点上下方位-左右

	topXAdjustment : 20,//离左边距的位置
	topYAdjustment : 20,//离上边界位置
	bottomXAdjustment : 20,//离右边距的位置
	bottomYAdjustment : 50,//离下边距的位置
	maxX :0,
	maxY : 0,

	linkType : "B",//显示关系线
	linkColor : "blue",
	nodeColor : "#CCCCFF",//节点颜色
	nodeFill : '',
	nodeBorderColor : "blue",//节点的边框颜色
	joinLineStyle : 'red',//线的颜色
	colorStyle : '',
	expandedImage : '/DEP/resources/images/sys/less.gif',//展开显示图片
	collapsedImage : '/DEP/resources/images/sys/plus.gif',//折叠显示图片

	/**
	 * 2、初始化功能
	 * @type Boolean
	 */
	isEcoTree : true,//鼠标左右键是否屏蔽
	maxLevelHeight : [],//最大水平高度？
	maxLevelWidth : [],//最小水平高度？
	previousLevelNode : [],
	onRender : function(ct, position) {
		Ext.Panel.prototype.onRender.call(this, ct, position);
		this.innerCt = this.body.createChild( {
			tag : "div",
			cls : "x-tree-root-ct "
		});
		this.innerCt.position('relative');
		if (this.textEl)
			this.textEl.remove();
		this.createCanvas();
		this.createTextEl();
	},
	createTextEl : function() {
		if (!this.textEl)
			this.textEl = this.innerCt.createChild( {
				cls : '.x-ecotree-textct'
			});
		Ext.fly(this.textEl).select('*').remove();
//		this.textEl.position('absolute', 1500);
		this.textEl.setLeftTop(10,10);
		this.textEl.setSize(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
	},
	createCanvas : function(ct) {
		this.canvas = document.createElement("canvas");
		this.innerCt.appendChild(this.canvas);
		if (Ext.isIE)
			this.canvas = G_vmlCanvasManager.initElement(this.canvas);
		Ext.get(this.canvas).position('absolute');
		Ext.get(this.canvas).setLeftTop(0, 0);
		this.setCanvasSize(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
		this.ctx = this.getContext();
	},
	afterRender : function() {
//		console.log("111111111");
		Ext.Panel.prototype.afterRender.call(this);
		if (this.canvas && this.canvas.getContext)
			this.draw();
	},
	initTree : function() {
//		console.log("222");
		this.maxX = 0, this.maxY = 0;
		this.ctx.clearRect(0,0, document.documentElement.scrollWidth, document.documentElement.scrollHeight);
	},
	draw : function() {
//		console.log("333");
		this.initTree();
		this.createTextEl();
		this.positionTree();
		this.root.render();
	},
	positionTree : function() {
//		console.log("44");
		this.firstWalk(this, this.root, 0);
		this.initRootOffset();
		this.secondWalk(this, this.root, 0, 0, 0);
		this.setMaxWH();
	},
	setMaxWH : function() {
//		console.log("55");
		this.getMaxNodeWH();
		var w = this.maxX + this.maxNodeWidth;
		var h = this.maxY + this.maxNodeHeight;
		switch (this.iRootOrientation) {
			case 'top' :
			case 'left' :
				w += this.bottomXAdjustment;
				h += this.bottomYAdjustment;
				break;
		}
		alert(w+" - "+h);
		this.setCanvasSize(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
		this.setSize(w, h);
		if (this.textEl)
			this.textEl.setSize(w, h);
		this.fireEvent('canvasChanceSize', this, w, h);
	},
	initRootOffset : function() {
//		console.log("66");
		this.rootXOffset = this.topXAdjustment + this.root.x;
		this.rootYOffset = this.topYAdjustment + this.root.y;
		switch (this.iRootOrientation) {
			case 'bottom' :
			case 'right' :
				this.rootXOffset += this.bottomXAdjustment;
				this.rootYOffset += this.bottomYAdjustment;
				break;
		}
	},

	calMaxinLevel : function(node, level) {
//		console.log("7");
		this.setLevelHeight(node, level);
		this.setLevelWidth(node, level);
		this.setNeighbors(node, level);
	},
	firstWalk : function(tree, node, level) {
//		console.log("8");
		node.init();
		this.calMaxinLevel(node, level);
		var leftSibling = node.previousSibling;
		var lsSize = this.getNodeSize(leftSibling);
		var iss = this.iSiblingSeparation;// 兄弟节点之间间隔
		if (node.getChildrenCount() == 0) {
			// 加入子树间隔的处理
			node.prelim = (leftSibling != null) ? leftSibling.prelim + lsSize+ iss : 0;
		} else {
			for (var i = 0; i < node.childNodes.length; i++) {
				this.firstWalk(this, node.childNodes[i], level + 1);
			}
			var prelim = node.getChildrenCenter(tree) - this.getNodeSize(node)/ 2;
			if (leftSibling == null) {
				node.prelim = prelim;
			} else {
				node.prelim = leftSibling.prelim + lsSize + iss;
				node.modifier = node.prelim - prelim;
				// alert(node.text+":"+node.prelim +","+node.modifier);
				this.apportion(this, node, level, prelim);

			}
		}
	},
	apportion : function(tree, node, level, prelim) {
//		console.log("9");
		var firstChild = node.firstChild;
		var firstChildLeftNeighbor = firstChild.leftNeighbor;
		if (!firstChildLeftNeighbor && node.modifier < 0)
			node.modifier = 0;
		var j = 1;
		for (var k = this.iMaxDepth - level; firstChild != null && j <= k;) {
			var modifierSumRight = 0, modifierSumLeft = 0;
			var rightAncestor = firstChild;
			var leftAncestor = firstChildLeftNeighbor;

			for (var l = 0; l < j; l++) {
				if (rightAncestor)
					rightAncestor = rightAncestor.parentNode;
				if (leftAncestor)
					leftAncestor = leftAncestor.parentNode;
				if (rightAncestor)
					modifierSumRight += rightAncestor.modifier || 0;
				if (leftAncestor)
					modifierSumLeft += leftAncestor.modifier || 0;
			}

			var nbprelim = firstChildLeftNeighbor
					? firstChildLeftNeighbor.prelim
					: 0;
			var fcprelim = nbprelim + modifierSumLeft
					+ this.getNodeSize(firstChildLeftNeighbor)
					+ this.iSubtreeSeparation;
			var totalGap = fcprelim - (firstChild.prelim + modifierSumRight);
			// if(!firstChildLeftNeighbor&&firstChild.parentNode.modifier<0)
			// totalGap=Math.abs(totalGap);
			if (totalGap > 0) {
				var subtreeAux = node, numSubtrees = 0;
				for (; subtreeAux != null && subtreeAux != leftAncestor; subtreeAux = subtreeAux.previousSibling)
					numSubtrees++;
				if (subtreeAux != null) {
					var subtreeMoveAux = node;
					var singleGap = totalGap / numSubtrees;
					for (; subtreeMoveAux != leftAncestor; subtreeMoveAux = subtreeMoveAux.previousSibling) {

						subtreeMoveAux.prelim += totalGap;
						subtreeMoveAux.modifier += totalGap;
						totalGap -= singleGap;
					}
				}
			}

			if (!firstChildLeftNeighbor && firstChild.parentNode.modifier < 0)
				firstChild.parentNode.modifier = 0;
			j++;
			if (firstChild.getChildrenCount() == 0)
				firstChild = this.getLeftmost(node, 0, j);
			else
				firstChild = firstChild.firstChild;
			if (firstChild != null)
				firstChildLeftNeighbor = firstChild.leftNeighbor;
		}
	},
	calNodePosition : function(node, level, x, y) {
//		console.log("a");
		node.x = this.rootXOffset + node.prelim + x;
		node.y = this.rootYOffset + y;
		var maxsizeTmp = 0, nodesizeTmp = 0, flag = false;
		switch (this.iRootOrientation) {
			case 'top' :
			case 'bottom' :
				maxsizeTmp = this.maxLevelHeight[level];
				nodesizeTmp = node.height;
				break;
			case 'right' :
			case 'left' :
				maxsizeTmp = this.maxLevelWidth[level];
				nodesizeTmp = node.width;
				flag = true;
				break;
		}
		switch (this.iNodeJustification) {
			case 'center' :
				node.y += (maxsizeTmp - nodesizeTmp) / 2;
				break;
			case 'bottom' :
				node.y += maxsizeTmp - nodesizeTmp;
				break;
		}
		if (flag) { /* left和right方向時d为真 */
			var swapTmp = node.x;
			node.x = node.y;
			node.y = swapTmp;
		}
		switch (this.iRootOrientation) {
			case 'bottom' :
			case 'right' :
				node.y = -node.y;
				node.x = -node.x;
				break;
		}
		if (node.isParentCollapse() == false) {
			if (Math.abs(node.x) > this.maxX)
				this.maxX = Math.abs(node.x);
			if (Math.abs(node.y) > this.maxY)
				this.maxY = Math.abs(node.y);
		}
		return maxsizeTmp;
	},
	secondWalk : function(tree, node, level, x, y) {
//		console.log("b");
		var maxsizeTmp = this.calNodePosition(node, level, x, y);
		if (node.getChildrenCount() != 0)
			this.secondWalk(this, node.firstChild, level + 1,
					x + node.modifier, y + maxsizeTmp + this.iLevelSeparation);
		var rightSibling = node.nextSibling;
		if (rightSibling != null)
			this.secondWalk(tree, rightSibling, level, x, y);

	},
	getMaxNodeWH : function() {
//		console.log("c");
		this.maxNodeHeight = 0;
		this.maxNodeWidth = 0;
		for (var i = 0; i < this.maxLevelHeight.length; i++) {
			if (this.maxLevelHeight[i] > this.maxNodeHeight)
				this.maxNodeHeight = this.maxLevelHeight[i];
		}
		for (var i = 0; i < this.maxLevelWidth.length; i++) {
			if (this.maxLevelWidth[i] > this.maxNodeWidth)
				this.maxNodeWidth = this.maxLevelWidth[i];
		}
	},
	setLevelHeight : function(node, level) {
//		console.log("d");
		if (this.maxLevelHeight[level] == null)
			this.maxLevelHeight[level] = 0;
		if (this.maxLevelHeight[level] < node.height)
			this.maxLevelHeight[level] = node.height;
	},
	setLevelWidth : function(node, level) {
//		console.log("e");
		if (this.maxLevelWidth[level] == null)
			this.maxLevelWidth[level] = 0;
		if (this.maxLevelWidth[level] < node.width)
			this.maxLevelWidth[level] = node.width;
	},
	setNeighbors : function(node, level) {
//		console.log("f");
		node.leftNeighbor = this.previousLevelNode[level];
		if (node.leftNeighbor != null)
			node.leftNeighbor.rightNeighbor = node;
		this.previousLevelNode[level] = node;
	},
	getNodeSize : function(node) {
//		console.log("g");
		if (!node)
			return 0;
		switch (this.iRootOrientation) {
			case 'top' :
			case 'bottom' :
				return node.width;

			case 'right' :
			case 'left' :
				return node.height;
		}
		return 0;
	},
	getLeftmost : function(node, level, maxlevel) {
//		console.log("h");
		if (level >= maxlevel)
			return node;
		var n = node.getChildrenCount();
		if (n == 0)
			return null;
		for (var i = 0; i < n; i++) {
			var iChild = node.childNodes[i];
			var leftmostDescendant = this.getLeftmost(iChild, level + 1,
					maxlevel);
			if (leftmostDescendant != null)
				return leftmostDescendant;
		}
		return null;
	},

	initEvents : function() {
//		console.log("i");
		var config = this.dragConfig || {
			ddGroup : this.ddGroup || "TreeDD",
			scroll : this.ddScroll
		};
		if ((this.enableDD || this.enableDrag)) {
			this.dragZone = new Ext.tree.EcoTreeDragZone(this,
					this.getTreeEl(), config);
		}
		if ((this.enableDD || this.enableDrop)) {
			this.dropZone = new Ext.tree.EcoTreeDropZone(this,
					this.getTreeEl(), this.dropConfig || config);
		}
		Ext.tree.ECOTree.superclass.initEvents.call(this);
	},
	getContext : function() {
//		console.log("j");
		return this.canvas.getContext("2d");
	}
	,
	setCanvasSize : function(w, h) {
//		alert("k"+"w = "+w +" h="+ h);
		Ext.get(this.canvas).setSize(w, h);
		Ext.get(this.canvas).set( {
			width : w,
			height : h
		});
		this.width = w;
		this.height = h;
	}
});


//初始化
Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = "extjs/resources/images/default/s.gif"; 
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	var root = new Ext.tree.ECONode('北胜ddd天地');
	
	var n1 = new Ext.tree.ECONode( {
		text : '中江地产',
		width : 80,
		height : 40
	});
	var n2 = new Ext.tree.ECONode( {
		text : '北京高科',
		width : 80,
		height : 40
	});
	var n0 = new Ext.tree.ECONode( {
		text : '江中医贸',
		width : 80,
		height : 40
	});	
	var n3 = new Ext.tree.ECONode('江中药业');
	var n4 = new Ext.tree.ECONode('本草天工');
	var n5 = new Ext.tree.ECONode('江中小舟');
	var n7 = new Ext.tree.ECONode('东风医药');
	var n8 = new Ext.tree.ECONode('江中化工');
	var m1 = new Ext.tree.ECONode('财务部');
	var m2 = new Ext.tree.ECONode('售楼部');
	var l1 = new Ext.tree.ECONode('技术部');
	var l2 = new Ext.tree.ECONode('科研中心');
	var k1 = new Ext.tree.ECONode('信息部');
	var k2 = new Ext.tree.ECONode( {
		text : '开发中心',
		expanded : false
	});
	var i1 = new Ext.tree.ECONode('java方向');
	var i2 = new Ext.tree.ECONode('Net方向');
	var i3 = new Ext.tree.ECONode('Sap方向');

	root.appendChild(n1);
	root.appendChild(n2);
	root.appendChild(n0);
	root.appendChild(n3);
	root.appendChild(n4);
	root.appendChild(n5);
	n0.appendChild(m1);
	n0.appendChild(m2);
	n3.appendChild(l1);
	n2.appendChild(l2);
	l1.appendChild(k1);
	l1.appendChild(k2);
	k2.appendChild(i1);
	k2.appendChild(i2);
	k2.appendChild(i3);

	var tree = new Ext.tree.ECOTree( {
		renderTo : 'mytree',
		width : document.documentElement.scrollWidth,
		height :document.documentElement.scrollHeight,
		enableDD : true,
		myContextMenu:null,
		shadow : true,
        selectedCS: 'x-menu-item-active',
        arrowCS: 'x-menu-item-arrow',

		onAddButton:function(){
        	Ext.Msg.prompt("添加节点","名称",this.onAddNode,this);
		},
		onDeleteButton:function(){
        Ext.Msg.confirm("系统提示","您确定要删除当前节点吗?",this.onDeleteNode,this);
	    },
		listeners:{
              contextmenu:function(node,e){
				  this.myContextMenu = new Ext.menu.Menu({
	              width:120,
	              items: [{
	              text: "添加",
	              iconCls : "x-ecotree-selected ",
				  icon:"extjs/resources/images/default/dd/drop-add.gif",
	              handler:this.onAddButton,
	              scope:this
	              },{
	              text: "删除",
	              iconCls : "x-ecotree-selected ",
				  icon:"extjs/resources/images/default/dd/drop-no.gif",
	              handler:this.onDeleteButton,
	              scope:this
	              }]
				  });
				
                 e.preventDefault();
                 node.select();	//选中当前节点
                 this.myContextMenu["currentNode"] = node ;
                 if(this.myContextMenu["currentNode"].id==0){
                    //得到MixedCollection的第几个item用get()或itemAt
                    //如果是根节点，将删除功能设置为不可用
                    this.myContextMenu.items.get(1).setDisabled(true);
                    this.myContextMenu.showAt(e.getXY());
                 }else{
                    //这里必须设置为false,否则如果第一次点击的是根节点,再点击别的节点时
                    //删除功能也会不可用
                   this.myContextMenu.items.itemAt(1).setDisabled(false);
                   this.myContextMenu.showAt(e.getXY());
                 }
             
               }
            },
		onAddNode:function(btn, text){
		//alert(btn);
        if (btn == "ok"){
            //在为这个节点添加子节点之前，先将其赋值为非叶子节点，否则不能添加
            var parentNode=this.myContextMenu["currentNode"];
            parentNode.leaf=false;
            var newNode=new Ext.tree.ECONode({
                  leaf:true,
                  text:text
                })
     
			parentNode.appendChild(newNode);
            parentNode.expand();
            //alert("pid="+parentNode.id+",id="+newNode.id+",text="+newNode.text);
     
         }
    },
    onDeleteNode:function(btn){
       if(btn=="yes"){
          var currentNode=this.myContextMenu["currentNode"];
          //注意这个必须在currentNode进行remove之前,否则为null
          var currentNodeParent=currentNode.parentNode;
          currentNode.remove();
       }
    },
		root : root
	});
	
//	 tree.collapseAll();
	// tree.on('click',function(n,e){alert(n.text);},tree);
	new Ext.tree.TreeEditor(tree, {
		width : 30,
		height : 30
	});

	var win = new Ext.Window( {
		width : document.documentElement.scrollWidth,
		height :document.documentElement.scrollHeight,
		autoScroll : true,
		layout : 'fit',
		frame : true,
		title : '集团部门结构图',
		closable : false,
		items : [tree]
	});
	

	tree.on('canvasChanceSize', function(t, w, h) {
//		alert("ddd");
//		win.setSize(document.documentElement.scrollWidth,document.documentElement.scrollHeight)
	}, this);
	win.show();
});