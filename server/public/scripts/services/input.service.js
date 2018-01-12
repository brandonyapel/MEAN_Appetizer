myApp.service('InputService', function ($http, $location) {
    console.log('InputService Loaded');
    let self = this;

    self.formInputs = {
        projectName: 'dinosaur',
        tableName: 'dinosaur',
        hasDeleteButtons: true,
        hasEditButtons: true,
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
            if (this.hasEditButtons) {
                schemaString = '';
                schemaString += '\t//currentlyeEditingRow schema property\n'
                schemaString += '\t//turns true when edit button is clicked\n'
                schemaString += '\t//when true it will change row into\n'
                schemaString += '\t//editable input fields that will\n'
                schemaString += '\t//update database when save is clicked\n'
                schemaString += '\tcurrentlyEditingRow: {\n'
                schemaString += '\t\ttype: Boolean,\n'
                schemaString += '\t\tdefault: false,\n'
                schemaString += '\t},\n'
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
            if (this.hasEditButtons) {
                tableDOMHeaderString = '<th></th>\n\t\t'
                tableDOMHeader += tableDOMHeaderString
            }
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
            if (this.hasEditButtons) {
                //edit button exists when tableNameRow.currentlyEditingRow == false
                tableDataString = '\t'
                tableDataString += '<td ng-if = "!' + this.tableName + 'Row.currentlyEditingRow" >\n\t\t\t\t'
                tableDataString += '<button ng-click = "vm.' + this.tableName + 'EditRow(' + this.tableName + 'Row)" >'
                tableDataString += 'Edit'
                tableDataString += '</button>\n\t\t\t'
                tableDataString += '</td>\n\t\t\t'
                tableData += tableDataString
                //save button exists when tableNameRow.currentlyEditingRow == true
                tableDataString = ''
                tableDataString += '<td ng-if = "' + this.tableName + 'Row.currentlyEditingRow" >\n\t\t\t\t'
                tableDataString += '<button ng-click = "vm.' + this.tableName + 'SaveRow(' + this.tableName + 'Row)">'
                tableDataString += 'Save'
                tableDataString += '</button>\n\t\t\t'
                tableDataString += '</td>\n\t\t\t'
                tableData += tableDataString
                //data rows for loop defines number of columns in each row
                for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                    //table cells that exist when tableNameRow.currentlyEditingRow == false
                    tableDataString = '';
                    tableDataString += '<!--' + this.tableProperties[tablePropertyIndex].schemaProperty
                    tableDataString += ' static cell exists when ' + this.tableName + 'Row.currentlyEditingRow == false-->\n\t\t\t'
                    tableDataString += '<td ng-if = "!' + this.tableName + 'Row.currentlyEditingRow" >{{'
                    tableDataString += this.tableName
                    tableDataString += 'Row.'
                    tableDataString += this.tableProperties[tablePropertyIndex].schemaProperty
                    tableDataString += '}}</td>\n\t\t\t'
                    tableData += tableDataString
                    //table cells that exist when tableNameRow.currentlyEditingRow == true
                    tableDataString = '';
                    tableDataString += '<!--' + this.tableProperties[tablePropertyIndex].schemaProperty
                    tableDataString += ' editable input cell exists when ' + this.tableName + 'Row.currentlyEditingRow == true-->\n\t\t\t'
                    tableDataString += '<td ng-if = "' + this.tableName + 'Row.currentlyEditingRow" >\n\t\t\t\t'
                    tableDataString += '<input '
                    if (this.tableProperties[tablePropertyIndex].propertyType == 'String') {
                        tableDataString += 'type = "text" ';
                    }
                    else if (this.tableProperties[tablePropertyIndex].propertyType == 'Number') {
                        tableDataString += 'type = "number" ';
                    }
                    else if (this.tableProperties[tablePropertyIndex].propertyType == 'Boolean') {
                        tableDataString += 'type = "checkbox" ';
                    }
                    else if (this.tableProperties[tablePropertyIndex].propertyType == 'Date') {
                        tableDataString += 'type = "date" ';
                    }
                    else { return Error }
                    tableDataString += 'ng-model = '
                    tableDataString += '"' + this.tableName + 'Row.' 
                    tableDataString += this.tableProperties[tablePropertyIndex].schemaProperty
                    tableDataString += '" >\n\t\t\t'
                    tableDataString += '</td>\n\t\t\t'
                    tableData += tableDataString
                    
                    
                    
                }
            }
            else {
                for (let tablePropertyIndex = 0; tablePropertyIndex < this.tableProperties.length; tablePropertyIndex++) {
                    tableDataString = '';
                    tableDataString += '<td>{{'
                    tableDataString += this.tableName
                    tableDataString += 'Row.'
                    tableDataString += this.tableProperties[tablePropertyIndex].schemaProperty
                    tableDataString += '}}</td>\n\t\t\t'
                    tableData += tableDataString
                }
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
                let deleteRowController = ''
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
                let deleteRowMethod = ''
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
                let deleteRowRoute = ''
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
        editRowControllerJS() {
            if (this.hasEditButtons) {
                let editRowController = ''
                editRowController += `\t//edit row function called on clicking edit button next to row it toggles editable inputs for cells.\n`
                editRowController += `\tself.${this.tableName}EditRow = ${this.tableName}Service.${this.tableName}EditRow\n`
                editRowController += `\n`
                editRowController += `\t//save row function called on clicking save button saving the state of input fields and toggling back to static.\n`
                editRowController += `\tself.${this.tableName}SaveRow = ${this.tableName}Service.${this.tableName}SaveRow\n`
                return editRowController;
            }
            else {
                return ''
            }
        },
        editRowServiceJS() {
            if (this.hasEditButtons) {
                let editRowService = '';
                let editRowMethod = '';
                editRowMethod += `self.${this.tableName}EditRow = function (rowObject) {\n`
                editRowMethod += `\trowObject.currentlyEditingRow = true\n`
                editRowMethod += `\tid = rowObject._id\n`
                editRowMethod += `\t$http({\n`
                editRowMethod += `\t\tmethod: 'PUT',\n`
                editRowMethod += `\t\turl: '/${this.tableName}/'+id,\n`
                editRowMethod += `\t\tdata: rowObject,\n`
                editRowMethod += `\t}).then(function(response){\n`
                editRowMethod += `\t\tconsole.log('response',response);\n`
                editRowMethod += `\t\tself.${this.tableName}Get()\n`
                editRowMethod += `\t})\n`
                editRowMethod += `}\n\n`
                let saveRowMethod = '';
                saveRowMethod += `self.${this.tableName}SaveRow = function (rowObject) {\n`
                saveRowMethod += `\trowObject.currentlyEditingRow = false;\n`
                saveRowMethod += `\tid = rowObject._id;\n`
                saveRowMethod += `\t$http({\n`
                saveRowMethod += `\t\tmethod: 'PUT',\n`
                saveRowMethod += `\t\turl: '/${this.tableName}/'+id,\n`
                saveRowMethod += `\t\tdata: rowObject,\n`
                saveRowMethod += `\t}).then(function(response){\n`
                saveRowMethod += `\t\tconsole.log('response',response);\n`
                saveRowMethod += `\t\tself.${this.tableName}Get()\n`
                saveRowMethod += `\t})\n`
                saveRowMethod += `}`
                editRowService += editRowMethod
                editRowService += saveRowMethod

                return editRowService;
            }
            else {
                return ''
            }
        },
        editRowRouteJS() {
            if (this.hasDeleteButtons) {
                let editRowRoute = ''
                editRowRoute += `router.put('/:id', function(req,res){\n`
                editRowRoute += `\tconsole.log('/${this.tablename} put');`
                editRowRoute += `\t${this.tableName}Schema.findByIdAndUpdate(req.params.id, req.body, function(errorMakingDatabaseQuery, result) {\n`
                editRowRoute += `\t\tif(errorMakingDatabaseQuery){\n`
                editRowRoute += `\t\t\tconsole.log('error',errorMakingDatabaseQuery)\n`
                editRowRoute += `\t\t\tres.sendStatus(500);\n`
                editRowRoute += `\t\t} else {\n`
                editRowRoute += `\t\t\tconsole.log('result', result);\n`
                editRowRoute += `\t\t\tres.sendStatus(200);\n`
                editRowRoute += `\t\t}\n`
                editRowRoute += `\t})\n`
                editRowRoute += `});`

                return editRowRoute
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