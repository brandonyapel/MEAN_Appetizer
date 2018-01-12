myApp.service('InputService', function ($http, $location) {
    console.log('InputService Loaded');
    let self = this;

    self.formInputs = {
        projectName: 'dinosaur',
        tableName: 'dinosaur',
        hasDeleteButtons: true,
        hasEditButtons: false,
        hasInputForm: false,
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
            if (this.hasDeleteButtons == true) {
                tableDOMHeaderString = ''
                tableDOMHeaderString += '<th></th>\n\t\t'
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
            if (this.hasDeleteButtons) {
                tableDataString = ''
                tableDataString += '<td>'
                tableDataString += '<button ng-click = "vm.' + this.tableName + 'DeleteRow(' + this.tableName + 'Row._id)">'
                tableDataString += 'X'
                tableDataString += '</button>'
                tableDataString += '</td>\n\t\t\t'
                tableData += tableDataString
            }
            return tableData
        },
        deleteRowControllerJS() {
            if (this.hasDeleteButtons) {
                deleteRowController = ''
                deleteRowController += `\t// delete row function called on clicking x button next to row\n`
                deleteRowController += `\tself.${this.tableName}DeleteRow = ${this.tableName}Service.${this.tableName}DeleteRow`
                return deleteRowController
            }
            else {
                return ''
            }
        },
        deleteRowServiceJS() {
            if (this.hasDeleteButtons) {
                deleteRowMethod = ''
                deleteRowMethod += `self.${this.tableName}DeleteRow = function (id) {\n`
                deleteRowMethod += `\t$http({\n`
                deleteRowMethod += `\t\tmethod: 'DELETE',\n`
                deleteRowMethod += `\t\turl: '/${this.tableName}/'+id,\n`
                deleteRowMethod += `\t}).then(function(response){\n`
                deleteRowMethod += `\t\tconsole.log('response',response);\n`
                deleteRowMethod += `\t\tself.${this.tableName}Get()\n`
                deleteRowMethod += `\t})`
                deleteRowMethod += `}`
                return deleteRowMethod
            }
            else {
                return ''
            }
        },
        deleteRowRouteJS() {
            if (this.hasDeleteButtons) {
                deleteRowRoute = ''
                deleteRowRoute += `router.delete('/:id', function(req,res){\n`
                deleteRowRoute += `\tconsole.log('/${this.tablename} delete');`
                deleteRowRoute += `\t${this.tableName}Schema.remove({ _id: req.params.id  }, function(errorMakingDatabaseQuery, result) {\n`
                deleteRowRoute += `\t\tif(errorMakingDatabaseQuery){\n`
                deleteRowRoute += `\t\t\tconsole.log('error',errorMakingDatabaseQuery)\n`
                deleteRowRoute += `\t\t\tres.sendStatus(500);\n`
                deleteRowRoute += `\t\t} else {\n`
                deleteRowRoute += `\t\t\tconsole.log('result', result);\n`
                deleteRowRoute += `\t\t\tres.sendStatus(200);\n`
                deleteRowRoute += `\t\t}\n`
                deleteRowRoute += `\t})\n`
                deleteRowRoute += `});`
                return deleteRowRoute
            }
            else {
                return ''
            }
        },
    };

    self.addProperty = function () {
        self.formInputs.tableProperties.push({ tableHeader: '', schemaProperty: '', propertyType: '' });
        console.log('addProperty()')
    };





});