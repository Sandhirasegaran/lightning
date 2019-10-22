@isTest
public class TestRestrictContactByName
{
	static testMethod void unitTest()
    {
        Test.startTest();
        List<Contact> contList = new List<Contact>{new Contact(LastName = 'INVALIDNAME')};
        Database.SaveResult[] srList = Database.insert(contList, false);
        Test.stopTest();
        
    }
}