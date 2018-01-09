myApp.service('inputService', function ($http, $location) {
    console.log('inputService Loaded');
    let self = this;

    self.formInputs = {
        projectName: '',
        tableName: '',
        tableProperties: [{tableHeaders: '', propertyType: ''}],
        tableSchema () {
            let schema = '';
            for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                let schemaString = ''; 
                schemaString += this.tableProperties[tablePropertyIndex].tableHeaders;
                schemaString += ': ';
                schemaString += '{type:',this.tableProperties[tablePropertyIndex].tableHeaders+'},\
                ';
                schema += schemaString;
            }
            return schema
        },
        tableFormInputsHTML () {

        },
        tableDOMHeaderHTML () {

        },
        tableDataHTML () {

        }
    };

    




});