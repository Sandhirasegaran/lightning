({
    searchKeyChange: function(component, event, helper) {
        var myEvent = $A.get("e.light_ss:SearchKeyChange");
        myEvent.setParams({"searchKey": event.target.value});
        myEvent.fire();
    }
})