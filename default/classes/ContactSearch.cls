public class ContactSearch
{
	public static List<Contact> searchForContacts(String lname, String pcode)
    {
        try{
            List<Contact> contactList = new List<Contact>();
            contactList = [SELECT ID, Name FROM Contact WHERE LastName=:lname AND MailingPostalCode=:pcode];
            return contactList;
        }
        catch(Exception e)
        {
            System.debug('Exception: ' + e.getMessage());
        }
        return null;
    }
}