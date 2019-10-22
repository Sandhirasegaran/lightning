@isTest
public class TestVerifyDate
{
	static testMethod void unitTestDays()
    {
        Date dt1 = Date.newInstance(2014, 11, 02);
        Date dt2 = Date.newInstance(2014, 11, 25);
        Date tmpDate = VerifyDate.CheckDates(dt1, dt2);
    }
	static testMethod void unitTestEndOfMonth()
    {
        Date dt3 = Date.valueOf('2015-11-02');
        Date dt4 = Date.valueOf('2015-12-25');
        Date tmpDate = VerifyDate.CheckDates(dt3, dt4);
    }
}