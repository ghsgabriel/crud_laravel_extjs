Ext.define('frontend.controller.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usercontroller',

    requires: [
        'frontend.service.UserService',
        'frontend.service.ViaCepService',
        'frontend.service.ExportService'
    ],

    onAddUserClick() {
        this.showUserForm();
    },

    onEditUserClick(grid, info) {
        this.showUserForm(info.record);
    },

    showUserForm(record) {
        const form = Ext.create('frontend.view.user.UserForm');
        
        if (record) {
            form.setValues(record.getData());
        }
        
        Ext.create('Ext.Dialog', {
            title: record ? 'Editar Usuário' : 'Adicionar Usuário',
            closable: true,
            maximizable: true,
            width: 400,
            height: 500,
            layout: 'fit',
            items: [form]
        }).show();
    },

    onDeleteUserClick(grid, info) {
        Ext.Msg.confirm('Confirmar', 'Tem certeza que deseja excluir este usuário?', (btn) => {
            if (btn === 'yes') {
                this.deleteUser(info.record);
            }
        });
    },

    deleteUser(record) {
        frontend.service.UserService.delete(record.getId())
            .then(() => {
                Ext.Msg.alert('Sucesso', 'Usuário excluído com sucesso!');
                this.getView().getStore().remove(record);
            })
            .catch(() => {
                Ext.Msg.alert('Erro', 'Falha ao excluir o usuário. Por favor, tente novamente.');
            });
    },

    onSaveUser(button) {
        const form = button.up('userform');
        const dialog = button.up('dialog');
        const values = form.getValues();
        const isNewUser = !values.id;

        if (form.validate()) {
            const cleanedValues = this.cleanFormData(values);
            this.saveUserToServer(cleanedValues, isNewUser, dialog);
        }
    },

    saveUserToServer(userData, isNewUser, dialog) {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Salvando...'});

        const savePromise = isNewUser 
            ? frontend.service.UserService.create(userData)
            : frontend.service.UserService.update(userData.id, userData);

        savePromise
            .then(response => {
                this.handleSaveSuccess(response, isNewUser, dialog);
                Ext.GlobalEvents.fireEvent('userupdated');
            })
            .catch(response => this.handleSaveFailure(response))
            .finally(() => Ext.Viewport.setMasked(false));
    },

    handleSaveSuccess(response, isNewUser, dialog) {
        Ext.Msg.alert('Sucesso', `Usuário ${isNewUser ? 'criado' : 'atualizado'} com sucesso!`, () => {
            dialog.close();
        });
    },

    handleSaveFailure(response) {
        this.handleErrorResponse(response);
    },

    handleErrorResponse(response) {
        let errorMsg = 'Erro ao salvar o usuário.';
     
        const responseObj = Ext.JSON.decode(response.responseText);
        if (responseObj.errors) {
            errorMsg = this.formatErrorMessages(responseObj.errors);
        } else if (responseObj.message) {
            errorMsg = responseObj.message;
        }

        Ext.Msg.alert('Erro', errorMsg);
    },

    formatErrorMessages(errors) {
        let formattedMsg = 'Erros encontrados:';
        Ext.Object.each(errors, (field, fieldErrors) => {
            formattedMsg += `<br>- ${field}: ${fieldErrors.join(', ')}`;
        });
        return formattedMsg;
    },

    onCancelForm(button) {
        button.up('dialog').close();
    },

    onZipCodeChange(field) {
        const zipCode = field.getValue().replace(/\D/g, '');
        if (zipCode.length === 8) {
            this.fetchAddressData(zipCode, field.up('userform'));
        }
    },

    fetchAddressData(zipCode, form) {
        frontend.service.ViaCepService.fetchAddressData(zipCode)
            .then(data => {
                if (!data.erro) {
                    form.setValues({
                        state: data.uf,
                        city: data.localidade,
                        district: data.bairro,
                        address: data.logradouro
                    });
                } else {
                    Ext.Msg.alert('Erro', 'CEP não encontrado');
                }
            })
            .catch(() => Ext.Msg.alert('Erro', 'Não foi possível buscar o CEP'));
    },

    cleanFormData(values) {
        const cleaned = Ext.apply({}, values);

        cleaned.cpf = this.removeNonDigits(values.cpf);
        cleaned.phone = this.removeNonDigits(values.phone);
        cleaned.zip_code = this.removeNonDigits(values.zip_code);

        if (values.birth_date) {
            cleaned.birth_date = Ext.Date.format(new Date(values.birth_date), 'Y-m-d');
        }

        return cleaned;
    },

    removeNonDigits(value) {
        return value ? value.replace(/\D/g, '') : value;
    },

    onExportCSV() {
        this.exportData('CSV');
    },

    onExportPDF() {
        this.exportData('PDF');
    },

    onExportXLSX() {
        this.exportData('XLSX');
    },

    exportData(format) {
        const grid = this.findUserGrid();
        if (grid) {
            const methodName = `exportTo${format}`;
            frontend.service.ExportService[methodName](grid.getStore());
        } else {
            Ext.Msg.alert('Erro', 'Não foi possível encontrar a grid de usuários.');
        }
    },

    findUserGrid() {
        return Ext.ComponentQuery.query('userview')[0];
    },

    onSearchChange(searchfield, newValue) {
        const grid = this.findUserGrid();
        const store = grid.getStore();
        
        if (newValue) {
            store.filterBy(record => this.filterRecord(record, newValue));
        } else {
            store.clearFilter();
        }
    },

    filterRecord(record, searchValue) {
        const regex = new RegExp(Ext.String.escapeRegex(searchValue), 'i');
        return regex.test(record.get('name')) || 
               regex.test(record.get('email')) ||
               regex.test(record.get('cpf'));
    },

    onViewUserClick: function(grid, info) {
        var record = info.record;
        Ext.create('Ext.Dialog', {
            title: 'Detalhes do Usuário',
            closable: true,
            maximizable: true,
            width: 400,
            height: 450,
            layout: 'fit',
            items: [{
                xtype: 'formpanel',
                scrollable: 'y',
                items: [
                    { xtype: 'displayfield', label: 'ID', value: record.get('id') },
                    { xtype: 'displayfield', label: 'Nome', value: record.get('name') },
                    { xtype: 'displayfield', label: 'CPF', value: this.formatCPF(record.get('cpf')) },
                    { xtype: 'displayfield', label: 'Data de Nascimento', value: Ext.Date.format(record.get('birth_date'), 'd/m/Y') },
                    { xtype: 'displayfield', label: 'Email', value: record.get('email') },
                    { xtype: 'displayfield', label: 'Telefone', value: this.formatPhone(record.get('phone')) },
                    { xtype: 'displayfield', label: 'CEP', value: this.formatZipCode(record.get('zip_code')) },
                    { xtype: 'displayfield', label: 'Estado', value: record.get('state') },
                    { xtype: 'displayfield', label: 'Cidade', value: record.get('city') },
                    { xtype: 'displayfield', label: 'Bairro', value: record.get('district') },
                    { xtype: 'displayfield', label: 'Endereço', value: record.get('address') }
                ]
            }]
        }).show();
    },

    formatCPF: function(value) {
        return value ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    },

    formatPhone: function(value) {
        return value ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '';
    },

    formatZipCode: function(value) {
        return value ? value.replace(/(\d{5})(\d{3})/, '$1-$2') : '';
    }
});