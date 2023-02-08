const fieldData = [
    {
        "heading":"Prediction",
        "fields":[
            "Theme",
            "Sub-Theme",
            "Reason",
            "Language",
            "Source",
            "Rating",
            "Time Period"
        ]
    },
    {
        "heading":"Common",
        "fields":[
            "Customer ID"
        ]
    }
];

const condition = [
    'Equals' , 'Does not equal' , 'Like' , 'Not like' , 'Is Empty' , 'Is' , 'Is not'
];

const criteria = {
    "Theme":["Offers","Performance","Platform","Product Feedback"],
    "Sub-Theme":["Sub-Offers","Sub-Performance","Sub-Platform"],
    "Reason":["good","bad","normal"],
    "Language":["English","Hindi","French"],
    "Source":["Source1","Source2"],
    "Rating":["one","two","three","four"],
    "Time Period":["1 month","1 year"],
    "Customer ID":["ID1","ID2","ID3"]
}
export {fieldData,condition,criteria};