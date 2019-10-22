({
	doInit : function(component, event, helper) {
        $A.run(function() {
            setTimeout(function() {
	        	helper.calculateMonthlyPayment(component);
        	});
        });
    },
	calculateMonthlyPayment : function(component, event, helper) {
        helper.calculateMonthlyPayment(component);
	}
})