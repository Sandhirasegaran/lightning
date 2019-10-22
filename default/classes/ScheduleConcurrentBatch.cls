/*
Class Name: ScheduleConcurrentBatch
You may attempt to use the following code sample to avoid encountering this limit, particularly if the batch is executed in a scheduled class.
Error: Attempted to schedule too many concurrent batch jobs in this org

- Count how many current jobs are being executed.
- This information is stored in the AsyncApexJob table.
- Before calling the Database.executebatch() method within a scheduled class
*/
global class ScheduleConcurrentBatch implements schedulable{
    global void execute(SchedulableContext scObj){
        //check if there are 5 active batch jobs
        //In some cases, might need to add "Status='Queued' " to the criteria
        // Holding, Queued, Preparing, Processing, Completed, Aborted & Failed
        // Future, SharingRecalculation, ScheduledApex, BatchApex, BatchApexWorker, TestRequest, TestWorker, ApexToken, Queueable
        if ([SELECT count() FROM AsyncApexJob WHERE JobType='BatchApex' AND (Status = 'Processing' OR Status = 'Preparing')] < 5){ 
           //Database.executeBatch(batchClassInstance);
        } else {
           //schedule this same schedulable class again in 30 mins
           ScheduleConcurrentBatch sc = new ScheduleConcurrentBatch();
           Datetime dt = Datetime.now().addMinutes(30);  // i.e. 30 mins
           String timeForScheduler = dt.format('s m H d M \'?\' yyyy');
           Id schedId = System.Schedule('ScheduleConcurrentBatch Retry - ' + timeForScheduler, timeForScheduler, sc);
        }
    }
}