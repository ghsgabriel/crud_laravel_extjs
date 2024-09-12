Ext.define('frontend.view.main.header.HeaderView', {
    extend: 'Ext.Toolbar',
    xtype: 'headerview',
    cls: 'headerview',
    viewModel: {},
    controller: 'usercontroller',
    items: [
        { 
            xtype: 'container',
            cls: 'headerviewtext',
            bind: { html: '<h3>Usuários</h3>' }
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'searchfield',
            placeholder: 'Buscar usuários...',
            width: 500,
            cls: 'white-search-field',
            listeners: {
                change: 'onSearchChange'
            }
        },
        {
            xtype: 'spacer'
        },
        {
            text: 'Exportar',
            ui: 'action',
            menu: [{
                text: 'Exportar para CSV',
                handler: 'onExportCSV'
            }, {
                text: 'Exportar para PDF',
                handler: 'onExportPDF'
            },{
                text: 'Exportar para XLSX',
                handler: 'onExportXLSX'
            }]
        },
        {
            text: 'Adicionar Usuário',
            pressed: true,
            ui: 'action',
            handler: 'onAddUserClick'
        }
    ]
});