public class StringArrayTest
{
	public static List<String> generateStringArray(Integer i)
    {
        List<String> retrunArray = new List<String>();
        if(i != null)
        {
            for(Integer j = 0; j < i; j++)
            {
                retrunArray.add('Test ' + j);
            }
        }
        return retrunArray;
    }
}