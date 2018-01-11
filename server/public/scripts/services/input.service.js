myApp.service('InputService', function ($http, $location) {
    console.log('InputService Loaded');
    let self = this;

    self.formInputs = {
        projectName: 'dinosaur',
        tableName: 'dinosaur',
        tableProperties: [
            {
                tableHeader: 'Name',
                schemaProperty: 'name',
                propertyType: 'String'
            }, {
                tableHeader: 'Finger Count',
                schemaProperty: 'fingerCount',
                propertyType: 'Number'
            }, {
                tableHeader: 'Is Extinct?',
                schemaProperty: 'isExtinct',
                propertyType: 'Boolean'
            }, {
                tableHeader: 'Birthday',
                schemaProperty: 'birthday',
                propertyType: 'Date'
            },
        ],
        tableSchema() {
            let schema = '';
            let schemaString = ''
            for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                schemaString = '\t';
                schemaString += this.tableProperties[tablePropertyIndex].schemaProperty;
                schemaString += ': ';
                schemaString += '{type: ' + this.tableProperties[tablePropertyIndex].propertyType + '},\n';
                schema += schemaString;
            }

            return schema
        },
        tableFormInputsHTML() {
            let tableFormInputsHTML = ''
            let tableFormInputsHTMLstring = ''
            for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                tableFormInputsHTMLstring = '';
                tableFormInputsHTMLstring += '<label for='
                tableFormInputsHTMLstring += this.tableProperties[tablePropertyIndex].schemaProperty
                tableFormInputsHTMLstring += '>'
                tableFormInputsHTMLstring += this.tableProperties[tablePropertyIndex].tableHeader
                tableFormInputsHTMLstring += '</label>\n\t'
                tableFormInputsHTMLstring += '<input ';
                //test property type to decide input type
                if (this.tableProperties[tablePropertyIndex].propertyType == 'String') {
                    tableFormInputsHTMLstring += 'type = "text" ';
                }
                else if (this.tableProperties[tablePropertyIndex].propertyType == 'Number') {
                    tableFormInputsHTMLstring += 'type = "number" ';
                }
                else if (this.tableProperties[tablePropertyIndex].propertyType == 'Boolean') {
                    tableFormInputsHTMLstring += 'type = "checkbox" ';
                }
                else if (this.tableProperties[tablePropertyIndex].propertyType == 'Date') {
                    tableFormInputsHTMLstring += 'type = "date" ';
                }
                else { return Error }
                tableFormInputsHTMLstring += 'ng-model = "vm.' + this.tableName + 'NewRow.' + this.tableProperties[tablePropertyIndex].schemaProperty + '" ';
                tableFormInputsHTMLstring += 'name = "' + this.tableProperties[tablePropertyIndex].schemaProperty + '"';
                tableFormInputsHTMLstring += '>\n\t';
                tableFormInputsHTML += tableFormInputsHTMLstring;
            }
            return tableFormInputsHTML
        },
        tableDOMHeaderHTML() {
            let tableDOMHeader = '';
            let tableDOMHeaderString = ''
            for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                tableDOMHeaderString = '';
                tableDOMHeaderString += '<th>';
                tableDOMHeaderString += this.tableProperties[tablePropertyIndex].tableHeader;
                tableDOMHeaderString += '</th>\n\t\t';
                tableDOMHeader += tableDOMHeaderString
            }
            return tableDOMHeader
        },
        tableDataHTML() {
            let tableData = '';
            let tableDataString = '';
            for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                tableDataString = '';
                tableDataString += '<td>{{'
                tableDataString += this.tableName
                tableDataString += 'Row.'
                tableDataString += this.tableProperties[tablePropertyIndex].schemaProperty
                tableDataString += '}}</td>\n\t\t\t'
                tableData += tableDataString
            }
            return tableData
        }
    };

    self.addProperty = function () {
        self.formInputs.tableProperties.push({ tableHeader: '', schemaProperty: '', propertyType: '' });
        console.log('addProperty()')
    };





});