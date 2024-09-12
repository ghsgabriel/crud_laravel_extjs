Ext.define('frontend.service.ExportService', {
    singleton: true,

    requires: [
        'Ext.Loader'
    ],

    exportToCSV(store) {
        const csv = this.generateCSV(store);
        this.downloadFile(csv, 'usuarios.csv', 'text/csv;charset=utf-8;');
    },

    exportToPDF(store) {
        const data = this.prepareDataForExport(store);
        this.generatePDF(data);
    },

    exportToXLSX(store) {
        const data = this.prepareDataForExport(store);
        this.generateXLSX(data);
    },

    generateCSV(store) {
        const data = this.prepareDataForExport(store);
        return data.map(row => row.join(',')).join('\n');
    },

    prepareDataForExport(store) {
        const headers = ['Nome', 'CPF', 'Data de Nascimento', 'Email', 'Telefone', 'CEP', 'Estado', 'Cidade', 'Bairro', 'Endereço'];
        const rows = store.getData().items.map(record => [
            record.get('name'),
            record.get('cpf'),
            Ext.Date.format(record.get('birth_date'), 'd/m/Y'),
            record.get('email'),
            record.get('phone'),
            record.get('zip_code'),
            record.get('state'),
            record.get('city'),
            record.get('district'),
            record.get('address')
        ]);
        return [headers, ...rows];
    },

    generatePDF(data) {
        if (typeof window.jspdf === 'undefined') {
            Ext.Msg.alert('Erro', 'A biblioteca jsPDF não está disponível.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt'
        });

        doc.autoTable({
            head: [data[0]],
            body: data.slice(1),
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { cellWidth: 70 },
                2: { cellWidth: 70 },
                3: { cellWidth: 120 },
                4: { cellWidth: 70 },
                5: { cellWidth: 60 },
                6: { cellWidth: 40 },
                7: { cellWidth: 80 },
                8: { cellWidth: 80 },
                9: { cellWidth: 'auto' }
            },
            margin: { top: 30 }
        });

        doc.save('usuarios.pdf');
    },

    generateXLSX(data) {
        Ext.Loader.loadScript({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js',
            onLoad: () => {
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.aoa_to_sheet(data);
                XLSX.utils.book_append_sheet(workbook, worksheet, "Usuários");
                XLSX.writeFile(workbook, "usuarios.xlsx");
            },
            onError: () => {
                Ext.Msg.alert('Erro', 'Não foi possível carregar a biblioteca XLSX.');
            }
        });
    },

    downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }
});