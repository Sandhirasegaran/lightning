({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
            {label: 'Account name', fieldName: 'accountName', type: 'text'},
            {label: 'Close date', fieldName: 'closeDate', type: 'date'},
            {label: 'Confidence', fieldName: 'confidence', type: 'percent'},
            {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR'}},
            {label: 'Contact Email', fieldName: 'contact', type: 'email'},
            {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
            {label: 'Website', fieldName: 'website', type: 'url', typeAttributes: { target: '_parent'}},
            {label: 'Address', fieldName: 'address', type: 'location'}
        ]);
        
        var fetchData = {
            opportunityName: "company.companyName",
            accountName : "name.findName",
            closeDate : "date.future",
            amount : "finance.amount",
            contact: "internet.email",
            phone : "phone.phoneNumber",
            website : "internet.url",
            status : {type : "helpers.randomize", values : [ 'Pending', 'Approved', 'Complete', 'Closed' ] },
            actionLabel : {type : "helpers.randomize", values : [ 'Approve', 'Complete', 'Close', 'Closed' ]},
            confidenceDeltaIcon : {type : "helpers.randomize", values : [ 'utility:up', 'utility:down' ]}
        };


        helper.fetchData(cmp, fetchData, 100);
    },
    updateRowSelection: function (cmp) {
        cmp.set('v.selectedRows', cmp.get('v.selection'));
    },
    handleGroupChange: function (cmp, event) {
        var value = event.getParam('value');
        cmp.set('v.selection', value);
    }
})