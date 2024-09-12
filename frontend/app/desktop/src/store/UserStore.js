Ext.define('frontend.store.UserStore', {
  extend: 'Ext.data.Store',
  alias: 'store.userstore',

  model: 'frontend.model.UserModel',

  proxy: {
    type: 'ajax',
    url: Ext.manifest.API_BASE_URL,
    reader: {
        type: 'json',
        rootProperty: 'data'
    }
  },

  autoLoad: true
});