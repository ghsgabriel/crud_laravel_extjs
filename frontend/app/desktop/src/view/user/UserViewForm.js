Ext.define('frontend.view.user.UserForm', {
  extend: 'Ext.field.Panel',
  xtype: 'userform',
  
  controller: 'usercontroller',

  requires: [
      'frontend.controller.UserController',
      'Ext.field.Text',
      'Ext.field.Date',
      'Ext.field.Email',
      'Ext.field.InputMask',
      'frontend.util.Validators'
  ],

  
  items: [{
      xtype: 'hiddenfield',
      name: 'id'
  }, {
      xtype: 'textfield',
      name: 'name',
      label: 'Nome',
      required: true
  }, {
      xtype: 'textfield',
      name: 'cpf',
      label: 'CPF',
      required: true,
      maxLength: 14,
      minLength: 14,
      inputMask: '999.999.999-99',
      validators: function(value) {
          return frontend.util.Validators.validateCPF(value);
      }
  }, {
      xtype: 'datefield',
      name: 'birth_date',
      label: 'Data de Nascimento',
      required: true,
      dateFormat: 'Y-m-d'
  }, {
      xtype: 'emailfield',
      name: 'email',
      label: 'Email',
      required: true,
      validators: {
          type: 'email',
          message: 'Por favor, insira um endereço de e-mail válido'
      }
  }, {
      xtype: 'textfield',
      name: 'phone',
      label: 'Telefone',
      required: true,
      maxLength: 15,
      minLength: 14,
      inputMask: '(99) 99999-9999',
      validators: function(value) {
          return frontend.util.Validators.validatePhone(value);
      },
  }, {
      xtype: 'textfield',
      name: 'zip_code',
      label: 'CEP',
      required: true,
      maxLength: 9,
      minLength: 9,
      inputMask: '99999-999',
      validators: {
          type: 'format',
          matcher: /^\d{5}-\d{3}$/,
          message: 'CEP inválido. Use o formato: 00000-000'
      },
      listeners: {
          change: 'onZipCodeChange'
      }
  }, {
      xtype: 'textfield',
      name: 'state',
      label: 'Estado',
      required: true
  }, {
      xtype: 'textfield',
      name: 'city',
      label: 'Cidade',
      required: true
  }, {
      xtype: 'textfield',
      name: 'district',
      label: 'Bairro',
      required: true
  }, {
      xtype: 'textfield',
      name: 'address',
      label: 'Endereço',
      required: true
  }],
  
  buttons: [{
      text: 'Salvar',
      handler: 'onSaveUser'
  }, {
      text: 'Cancelar',
      handler: 'onCancelForm'
  }],

  setRecord: function(record) {
      this.record = record;
      if (record) {
          this.setValues(record.getData());
      }
  }
});