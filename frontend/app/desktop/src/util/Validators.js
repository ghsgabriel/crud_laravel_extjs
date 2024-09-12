Ext.define('frontend.util.Validators', {
    singleton: true,

    validateCPF: function(value) {
        value = value.replace(/[^\d]+/g, '');
    
        if (value.length !== 11 || /^(\d)\1{10}$/.test(value)) {
            return 'CPF inválido';
        }
    
        var sum = 0;
        var remainder;
        
        for (var i = 1; i <= 9; i++) {
            sum = sum + parseInt(value.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        
        if (remainder !== parseInt(value.substring(9, 10))) {
            return 'CPF inválido';
        }
        
        sum = 0;
        for (var i = 1; i <= 10; i++) {
            sum = sum + parseInt(value.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        
        if (remainder !== parseInt(value.substring(10, 11))) {
            return 'CPF inválido';
        }
        
        return true;
    },

    validatePhone: function(value) {
        var cleanValue = value.replace(/[^\d]/g, '');
        
        console.log(cleanValue);
        console.log(cleanValue.length);
        console.log(cleanValue.length < 10 || cleanValue.length > 11);
        if (cleanValue.length < 10 || cleanValue.length > 11) {
            return 'Telefone inválido. Deve ter 10 ou 11 dígitos.';
        }

        return true;
    }
});