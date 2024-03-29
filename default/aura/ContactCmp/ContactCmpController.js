({
    doInit : function(component, event, helper) {

        var totalCnt = component.get("c.getTotalCount");
        totalCnt.setCallback(this, function(a) {
            component.set("v.totalNumberOfRows", a.getReturnValue());
        });
        $A.enqueueAction(totalCnt);

        var actions = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Delete', name: 'delete' }
        ];
        var headerActions = [
            {
                label: 'All',
                checked: true,
                name:'All'
            },
            {
                label: 'Completed',
                checked: false,
                name:'Completed'
            },
            {
                label: 'In Completed',
                checked: false,
                name:'In Completed'
            },
            {
                label: 'Pre Order',
                checked: false,
                name:'Pre Order'
            }
        ];

        component.set('v.columns', [
            {label: 'Action', fieldName: 'Id', type: 'boolean',
                "cellAttributes": {
                    "iconName": { "fieldName": "Id_chk" },
                    "iconPosition": "left"
                }
            },
            {label: 'Name', fieldName: 'Name', type: 'text',sortable:true ,actions: headerActions},
            {label: 'Email', fieldName: 'Email', type: 'email',sortable:true,actions: headerActions},
            {label: 'Assistant Name', fieldName: 'AssistantName', type: 'text',sortable:true},
            {label: 'Lead Source', fieldName: 'LeadSource', type: 'text',sortable:true},
            {label: 'Department', fieldName: 'Department', type: 'text',sortable:true,actions: headerActions},
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
        helper.getData(component);
    },
    updateSelectedText : function(component, event, helper){
        var selectedRows = event.getParam('selectedRows');
        alert('selectedRows: '+ JSON.stringify(selectedRows));
        component.set("v.selectedRowsCount" ,selectedRows.length );
        let obj = [];
        for (var i = 0; i < selectedRows.length; i++){
            obj.push({Name:selectedRows[i].Name});
        }

        component.set("v.selectedRowsDetails" ,JSON.stringify(obj) );
        component.set("v.selectedRowsList" ,event.getParam('selectedRows') );
    },
    handleSelect: function (component, event, helper) {
        var arr = component.get('v.data');
        var obj =  component.get("v.selectedRowsList");
        console.log('arr '+JSON.stringify(arr) );
        console.log('obj '+JSON.stringify(obj) );
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log('Button label: ' + selectedButtonLabel);
        var updateAction = component.get("c.setContactStatus");
        updateAction.setParams({ status : selectedButtonLabel , books: obj});
        updateAction.setCallback(this, function(a) {
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(updateAction);
    },
    loadMoreData: function (component, event, helper) {
        //Display a spinner to signal that data is being loaded
        event.getSource().set("v.isLoading", true);
        //Display "Loading" when more data is being loaded
        component.set('v.loadMoreStatus', 'Loading');
        helper.fetchData(component, component.get('v.rowsToLoad')).then($A.getCallback(function (data) {
            if (component.get('v.data').length >= component.get('v.totalNumberOfRows')) {
                component.set('v.enableInfiniteLoading', false);
                component.set('v.loadMoreStatus', 'No more data to load');
            } else {
                var currentData = component.get('v.data');
                //Appends new data to the end of the table
                var newData = currentData.concat(data);
                component.set('v.data', newData);
                component.set('v.loadMoreStatus', 'Please wait ');
            }
            event.getSource().set("v.isLoading", false);
        }));
    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        alert('action: ' + JSON.stringify(action) + ' :row: ' + JSON.stringify(row));

        var selectedRows = event.getParam('row');
        alert('selected Id: '+ selectedRows.Id);

        //component.set("v.selectedRowsCount" ,selectedRows.length );
        //let obj = [];
        //for (var i = 0; i < selectedRows.length; i++){
        //    obj.push({Name:selectedRows[i].Name});
        //}

        //alert('row detail: ' + JSON.stringify(obj));
        //component.set("v.selectedRowsDetails" ,JSON.stringify(obj) );
        alert('Before: ' + JSON.stringify(cmp.get("v.selectedRows")));
        cmp.set("v.selectedRows", [selectedRows.Id] );
        alert('After: ' + JSON.stringify(cmp.get("v.selectedRows")));

        /*switch (action.name) {
            case 'show_details':
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": row.Id,
                    "slideDevName": "detail"
                });
                navEvt.fire();
                break;
            case 'delete':
                var rows = cmp.get('v.data');
                var rowIndex = rows.indexOf(row);
                console.log('rowIndex'+rowIndex);
                console.log('rowIndex row'+rows[rowIndex].Id);
                var deleteAct = cmp.get("c.deleteContacts");
                deleteAct.setParams({ ids : rows[rowIndex].Id });
                $A.enqueueAction(deleteAct);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been delete successfully."
                });
                toastEvent.fire();
                rows.splice(rowIndex, 1);
                cmp.set('v.data', rows);
                break;
        }
        */
    },
    handleHeaderAction: function (cmp, event, helper) {

        // helper.getData(cmp);
        var actionName = event.getParam('action').name;
        var colDef = event.getParam('columnDefinition');
        var columns = cmp.get('v.columns');
        var activeFilter = cmp.get('v.activeFilter');
        console.log('activeFilter-->'+activeFilter);
        if (actionName !== activeFilter) {
            var idx = columns.indexOf(colDef);
            var actions = columns[idx].actions;
            console.log('actions'+actions)
            actions.forEach(function (action) {
                action.checked = action.name === actionName;
            });
            cmp.set('v.activeFilter', actionName);
            helper.updateBooks(cmp);
            cmp.set('v.columns', columns);
        }
    },
    // Client-side controller called by the onsort event handler
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
})