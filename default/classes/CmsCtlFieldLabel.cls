/**
* CmsCtlFieldLabel class
* Author: M.Sandhirasegaran
* Date: 20th Sept'17
* Class used to get the field label of specified object api name and field api name
* This class is referenced to Cms_CompFieldLabel component
*/
public class CmsCtlFieldLabel{
    public string fieldName { get; set; }
    public string objectName { get; set; }
    public string getObjFieldLabel(){
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType leadSchema = schemaMap.get(objectName);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
        return fieldMap.get(fieldName).getDescribe().getLabel();
    }
}