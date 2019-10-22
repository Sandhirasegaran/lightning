public class AccountHandler
{
	public static Account insertNewAccount(String AccName)
    {
        try
        {
            Account acc = new Account(Name = AccName);
            insert acc;
            return acc;
        }
        catch(DMLException de)
        {
            system.debug('DML Exception: ' + de.getMessage());
        }
        return null;
    }
}