Ext.define('frontend.model.UserModel', {
  extend: 'Ext.data.Model',
  fields: [
      {name: 'id', type: 'int'},
      {name: 'name', type: 'string'},
      {name: 'cpf', type: 'string'},
      {name: 'birth_date', type: 'date'},
      {name: 'email', type: 'string'},
      {name: 'phone', type: 'string'},
      {name: 'zip_code', type: 'string'},
      {name: 'state', type: 'string'},
      {name: 'city', type: 'string'},
      {name: 'district', type: 'string'},
      {name: 'address', type: 'string'}
  ]
});