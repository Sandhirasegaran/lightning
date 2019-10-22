({
	getValueFromApplicationEvent : function(component, event, helper) {
		var showResultValue = event.getParam("Pass_Result");
        component.set("v.Get_Result", showResultValue);
	}
})