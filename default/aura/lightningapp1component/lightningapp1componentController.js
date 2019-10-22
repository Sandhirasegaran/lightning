({
	callme : function(component, event, helper) {
		var name = component.find('name').get('v.value');
        component.find('myname').set('v.value', name);
	},
    callagain : function(component, event) {
    	var fullName = component.find('fname').get('v.value');
        var outputName = component.find('fnameOutput');
        outputName.set('v.value', fullName);
	}
})