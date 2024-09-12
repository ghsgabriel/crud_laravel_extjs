Ext.define('frontend.view.user.UserView', {
  extend: 'Ext.grid.Grid',
  xtype: 'userview',
  cls: 'userview',
  controller: 'usercontroller',
  requires: [
      'frontend.controller.UserController',
      'frontend.view.user.UserForm'
  ],
  store: {type: 'userstore'},
  columns: [
      { text: 'Nome', dataIndex: 'name', width: 220 },
      { text: 'CPF', dataIndex: 'cpf', width: 120,
        renderer: function(value) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
      },
      { text: 'Data de Nascimento', dataIndex: 'birth_date', width: 150,
        xtype: 'datecolumn', format: 'd/m/Y'
      },
      { text: 'Email', dataIndex: 'email', width: 180 },
      { text: 'Telefone', dataIndex: 'phone', width: 140,
        renderer: function(value) {
            return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
      },
      { text: 'CEP', dataIndex: 'zip_code', width: 100,
        renderer: function(value) {
            return value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
      },
      { text: 'Estado', dataIndex: 'state', width: 70 },
      { text: 'Cidade', dataIndex: 'city', width: 150 },
      { text: 'Bairro', dataIndex: 'district', width: 100 },
      { text: 'Endereço', dataIndex: 'address', flex: 1 },
      {
          text: 'Ações',
          width: 150,
          cell: {
              tools: [{
                  iconCls: 'x-fa fa-eye',
                  tooltip: 'Ver',
                  handler: 'onViewUserClick'
              }, {
                  iconCls: 'x-fa fa-edit',
                  tooltip: 'Editar',
                  handler: 'onEditUserClick'
              }, {
                  iconCls: 'x-fa fa-trash',
                  tooltip: 'Excluir',
                  handler: 'onDeleteUserClick'
              }]
          }
      }
  ],
  
  initialize: function() {
      this.callParent(arguments);
      Ext.GlobalEvents.on('userupdated', this.onUserUpdated, this);
  },
  
  onUserUpdated: function() {
    this.getStore().load();
  }
});