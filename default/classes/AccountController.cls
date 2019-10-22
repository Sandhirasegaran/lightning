public class AccountController {
    @AuraEnabled
    public static List<Account> getContactByAllAccount(){
        List<Account> acc = [Select Name, (Select Name, AssistantName, AccountId, Email, Department from Contacts) from Account];
        return acc;
    }

    @AuraEnabled
    public static List<Account> getAccount(){
        List<Account> acc = [Select Name,Id from Account];
        return acc;
    }

    @AuraEnabled
    public static List<Contact> getContacts(Integer limits , Integer offsets){
        System.debug('limits'+limits);
        System.debug('offsets'+offsets);
        Integer intlimits = integer.valueof(limits);
        Integer intoffsets = integer.valueof(offsets);

        List<Contact> conts = [Select Name, Department, CreatedDate, LeadSource,
                                AssistantName, AccountId from Contact Order by Name Limit :intlimits Offset :intoffsets];
        return conts;
    }

    @AuraEnabled
    public static void setContactStatus(String status , List<Contact> conts){
        System.debug('--'+status);
        System.debug('--conts --'+conts);
        for(contact c :conts){
            //c.Department = status;
        }

        //update conts;
    }

    @AuraEnabled
    public static Integer getTotalCount(){
        AggregateResult results = [select count(Id) total from Contact];
        Integer total =(Integer)results.get('total');
        return total;
    }

    @AuraEnabled
    public static void deleteContacts(String ids ){
        Delete [Select id from Contact where id=:ids];
    }
}