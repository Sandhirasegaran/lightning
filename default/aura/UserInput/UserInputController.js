({
	Add : function(component, event, helper) {
		var get_num1 = component.find("input1").get("v.value");
        var get_num2 = component.find("input2").get("v.value");
        var res = parseInt(get_num1) + parseInt(get_num2);
        var evt = $A.get("e.c:Result");
        evt.setParams({"Pass_Result" : res});
        evt.fire();
	}
})