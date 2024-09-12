Ext.define('frontend.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',

	routes: { 
		':xtype': {action: 'mainRoute'}
	},


	mainRoute:function(xtype) {
		var centerview = this.lookup('centerview');
		centerview.add({ xtype: 'userview',  itemId: 'userview', heading: "Usuários" });
		
	},
});
