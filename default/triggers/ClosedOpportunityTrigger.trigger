trigger ClosedOpportunityTrigger on Opportunity (after insert, after update)
{
    List<Task> processTaskList = new List<Task>();
    for(Opportunity opp : Trigger.New)
    {
        if(opp.StageName == 'Closed Won')
        {
            Task newTask = new Task();
            newTask.Subject = 'Follow Up Test Task';
            newTask.WhatId = opp.Id;
            processTaskList.add(newTask);
        }
    }

    if(processTaskList.size() > 0)
    {
        insert processTaskList;
    }
}