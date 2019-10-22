public class RandomContactFactory
{
	public static List<Contact> generateRandomContacts(Integer noCont, String lname)
    {
        List<Contact> contactList = new List<Contact>();
        for(Integer j = 1; j <= noCont; j++)
        {
            Contact con = new Contact(FirstName = 'Test ' + j);
            contactList.add(con);
        }
        return contactList;
    }
}