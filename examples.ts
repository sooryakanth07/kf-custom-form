const configExample = [
    {
        "Id": "Text_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Text",
        "Type": "Text",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Number_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Number",
        "Type": "Number",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "Decimalpoint": null
    },
    {
        "Id": "Date_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Date",
        "Type": "Date",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Date__Time",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Date & Time",
        "Type": "DateTime",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Dropdown",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Dropdown",
        "Type": "Select",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "YN",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "YN",
        "Type": "Boolean",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Text_area",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Text area",
        "Type": "Textarea",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "M_Select",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "M Select",
        "Type": "Multiselect",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "S_Currency",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "S Currency",
        "Type": "Currency",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "Decimalpoint": null
    },
    {
        "Id": "M_Currency",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "M Currency",
        "Type": "Currency",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "Decimalpoint": null
    },
    {
        "Id": "Email_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Email",
        "Type": "Email",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Checkbox_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Checkbox",
        "Type": "Checkbox",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Radio_1",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Radio",
        "Type": "Select",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": "Radio",
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "S_User",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "S User",
        "Type": "User",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "SourceFlowId": "User",
        "SourceFlowType": "User"
    },
    {
        "Id": "M_User",
        "ReadOnly": false,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "M User",
        "Type": "MultiUser",
        "IsSystemField": false,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "Name",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Name",
        "Type": "Text",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "_created_by",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Created by",
        "Type": "User",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "SourceFlowId": "UserAbstract",
        "SourceFlowType": null,
        "Attributes": [
            {
                "Id": "Status",
                "Name": "Status",
                "Type": "DropdownList"
            },
            {
                "Id": "FirstName",
                "Name": "First name",
                "Type": "Text"
            },
            {
                "Id": "LastName",
                "Name": "Last name",
                "Type": "Text"
            },
            {
                "Id": "ProfilePicture",
                "Name": "Profile picture",
                "Type": "ProfilePicture"
            }
        ]
    },
    {
        "Id": "_modified_by",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Modified by",
        "Type": "User",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false,
        "SourceFlowId": "UserAbstract",
        "SourceFlowType": null,
        "Attributes": [
            {
                "Id": "Status",
                "Name": "Status",
                "Type": "DropdownList"
            },
            {
                "Id": "FirstName",
                "Name": "First name",
                "Type": "Text"
            },
            {
                "Id": "LastName",
                "Name": "Last name",
                "Type": "Text"
            },
            {
                "Id": "ProfilePicture",
                "Name": "Profile picture",
                "Type": "ProfilePicture"
            }
        ]
    },
    {
        "Id": "_created_at",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Created at",
        "Type": "DateTime",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "_modified_at",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Modified at",
        "Type": "DateTime",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "_flow_name",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "Flow name",
        "Type": "Text",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": false
    },
    {
        "Id": "_doc_version",
        "ReadOnly": true,
        "Width": null,
        "MapTo": null,
        "IsSecondary": null,
        "Name": "DocVersion",
        "Type": "Text",
        "IsSystemField": true,
        "Model": "Test_All_Fields_A00",
        "Widget": null,
        "Required": false,
        "IsInternal": true
    }
]


const valuesExample = {
    "_id": "PkCT9cShTOek",
    "Name": "Test All Fields from Abdul Raghmaan K",
    "_created_by": {
        "_id": "UsBCTFx_VviN",
        "Name": "Abdul Raghmaan K",
        "Kind": "User"
    },
    "_modified_by": {
        "_id": "UsBCTFx_VviN",
        "Name": "Abdul Raghmaan K",
        "Kind": "User"
    },
    "_created_at": "2025-11-20T15:01:39Z",
    "_modified_at": "2025-11-20T15:01:39Z",
    "_flow_name": "Test All Fields",
    "_application_id": "grid_layout_A00",
    "_flow_type": "Form",
    "_doc_version": "194840205419303200",
    "Text_1": "Soorya",
    "Number_1": 30,
    "Date_1": "2025-11-12",
    "Date__Time": "2025-11-20T20:30:00+05:30 Asia/Kolkata",
    "Dropdown": "vasv",
    "YN": true,
    "Text_area": "**sdqwjdkj**",
    "M_Select": [
        "va",
        "s"
    ],
    "S_Currency": "123 USD",
    "M_Currency": "234 INR",
    "Email_1": "abd@a.com",
    "Checkbox_1": [
        "acfas",
        "vasv",
        "s"
    ],
    "Radio_1": "acfas",
    "S_User": {
        "_id": "UsBCT13RKWkb",
        "Name": "Sooryakanth",
        "Kind": "User"
    },
    "M_User": [
        {
            "_id": "UsBCT13RKWkb",
            "Name": "Sooryakanth",
            "Kind": "User"
        },
        {
            "_id": "UsBCTFx_VviN",
            "Name": "Abdul Raghmaan K",
            "Kind": "User"
        }
    ]
}