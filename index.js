// /*******************************************/console.log("Squad B");/*******************************************/

const fetchedData = async ()=>{                                         // Asynchronous fetchedData func
    try{                                                                //TRY Block
        let data = await fetch('https://restcountries.com/v3.1/all');   // storing fetched data into data variable
        let formattedData = await data.json();                          // converting data into JSON format
        return formattedData;                                           // returning formatted data
    }
    catch(err){                                                         //CATCH Block
        console.log("Error Handled --> Fetched Data : ", err);
    }
}


const txtFile = async () => {                                           // Asynchronous txtFile func
    try{                                                                // TRY  Block
        const fs = require('fs');                                       // fs --> File System          
        let input = await fs.promises.readFile('input.txt','utf8');     // Store file data in the form of string.

        let inputArray = input.split(',');                              //inputArray = ['val1','val2','val3', 'val4'];
        // console.log(inputArray);                                     // CHECK: 
        return inputArray;                                             // returning file data in the form of Array
    }
    catch(err){                                                       // CATCH Block
        console.log("Error Handled --> Text File :",err);
    } 
}


const Searching = async(data, searchVal)=>{                // Asynchronous Searching Function
    try                                                     // try Block
    {
        const _ = require('lodash');                        // install --> npm i lodash
        let searchOn = searchVal;                       // Storing first input value in search variable

        let searchedData = _.filter(data, (obj) => 
        {
            // Check if any part of the 'name' value in each entry includes the input 'name'
            return _.some(obj.name, (value) =>     // .some() -->  iterate each element(value) in the array obj.name.
            _.isString(value) && value.toLowerCase().includes(searchOn.toLowerCase()));  //checks if the value contains the search.
        }); 
        // console.log(searchedData);                       // CHECK:
        return searchedData;
    }
    catch(err){                                             //CATCH Block
        console.log("Error Handled --> Searching Block :",err);
    }
}


const Filtering = async (obj, filterVal) => {                   // Asynchronous Filtering Function
    try{                                                        //TRY Block
        const results = [];                                     // declaring empty array for storing data afterwards
        let filterOn = filterVal;

        function filter(obj) {
            for (const key in obj) {                            // iterate for every key in the object

            const value = obj[key];                             // storing the value of the key of object
            if (typeof value === "object" && value !== null) 
            {
                filter(value);
            } else if (typeof value === "string" && value.toLowerCase() === filterOn.toLowerCase()) 
            {
                results.push(obj);                              // PUSH object if the search matches with string                
                break;                                          // Exit the loop for this object once a match is found
            }
        }
    }
    filter(obj);                                               // FUNC Calling
    return results.length > 0 ? results : null;                 //Condition
    }
    catch(err)                                                      //CATCH Block
    {
        console.log("Error Handled --> Filtering Block :",err);
    }
}


const Key = async(Obj, Keyfind) => {
    try{ // hasOwnProperty is a built-in method It is used to check 
      //if an object has a property with a given name
      const results = Obj.filter(obj => obj.hasOwnProperty(Keyfind));
      return results.length > 0 ? 
           results.map(obj => ({ [Keyfind]: obj[Keyfind] })) : null;
           //It creates a new object with a single key-value pair.
    }catch (error){ 
        console.log("Error Handled --> Key Block :",error);}
}
  
  
const mainCall = async() =>{                                            // Async MainCall func
    try{
        let data = await fetchedData();                                 //CallBack Func 
        // console.log(data);                                           //CHECK:

        let inputVals = await txtFile();                                //CallBack Func
        // console.log(inputVals);                                      //CHECK:
        const searchVal = inputVals[0];                                 //storing 0th index input 
        const filterVal = inputVals[1];                                 //storing 1st index input 
        const Keyfind = inputVals[2];                                   //storing 2nd index input 
        const limitVal = parseInt(inputVals[3]);                        //converting 3rd index input to integer as it was in string
        
        if(!searchVal) console.log('Skipping Search as no searchVal found');
        const SearchedData = await Searching(data, searchVal);           //CallBack Func
        // console.log(SearchedData);                                   //CHECK:

        if(!filterVal) console.log('Skipping Filter as no filterVal found');
        const FilteredData = await Filtering(SearchedData, filterVal);    //CallBack Func
        // console.log(FilteredData);                                   //CHECK:

        let KeyRec = await Key(FilteredData, Keyfind);                //CallBack Func
        // console.log(KeyRec);

        if(KeyRec){
            const totalCount = KeyRec.length;
            console.log('Number of total records = ', totalCount);
            if(limitVal){
                limitarray = KeyRec.slice(0,limitVal);
                console.log(limitarray);
            }
            else console.log(KeyRec)
        }
        else console.log('No key match found')
    }catch(err){
        console.log('Error Handled --> Main Block :', err)
    }                                 
}

mainCall();