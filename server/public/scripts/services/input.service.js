myApp.service('InputService', function ($http, $location) {
    console.log('InputService Loaded');
    let self = this;

    self.formInputs = {
        projectName: 'dinosaur',
        tableName: 'dinosaur',
        tableProperties: [],
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
            return 'dinosaur'
        },
        tableFormInputsHTML () {
            return 'dinosaur'
        },
        tableDOMHeaderHTML () {
            return 'dinosaur'
        },
        tableDataHTML () {
            return 'dinosaur'
        }
    };

    self.addProperty = function () {
        self.formInputs.tableProperties.push({tableHeader: '', schemaProperty: '', propertyType: ''});
        console.log('addProperty()')
    };
    




});