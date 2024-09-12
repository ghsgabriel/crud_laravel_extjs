Ext.define('frontend.service.ViaCepService', {
    singleton: true,

    fetchAddressData: function(zipCode) {
        return new Ext.Promise(function(resolve, reject) {
            Ext.Ajax.request({
                url: `https://viacep.com.br/ws/${zipCode}/json/`,
                method: 'GET',
                success: function(response) {
                    resolve(Ext.JSON.decode(response.responseText));
                },
                failure: function(response) {
                    reject(response);
                }
            });
        });
    }
});