Ext.define('frontend.service.UserService', {
    singleton: true,

    baseUrl: Ext.manifest.API_BASE_URL,

    create: function(userData) {
        return this.sendRequest('POST', this.baseUrl, userData);
    },

    update: function(id, userData) {
        return this.sendRequest('PUT', `${this.baseUrl}/${id}`, userData);
    },

    delete: function(id) {
        return this.sendRequest('DELETE', `${this.baseUrl}/${id}`);
    },

    sendRequest: function(method, url, data) {
        return new Ext.Promise(function(resolve, reject) {
            Ext.Ajax.request({
                url: url,
                method: method,
                jsonData: data,
                success: function(response) {
                    if (method === 'DELETE') {
                        resolve();
                    } else {
                        resolve(Ext.JSON.decode(response.responseText));
                    }
                },
                failure: function(response) {
                    reject(response);
                }
            });
        });
    }
});