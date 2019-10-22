public class AuraAccount {
	@AuraEnabled
    public static Account[] getAccounts(){
        List<Account> accountList = [SELECT Id, name FROM Account];
        return accountList;
    }
}