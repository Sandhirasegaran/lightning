public class ContactAndLeadSearch
{
	public static List<List<SObject>> searchContactsAndLeads(String tmp)
    {
        try{
			List<List<SObject>> searchList = [FIND :tmp IN NAME FIELDS RETURNING Contact(FirstName, LastName), Lead(FirstName, LastName)];
            return searchList;
        }
		catch(Exception e)
        {
            
        }
        return null;
    }
}