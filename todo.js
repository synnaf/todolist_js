window.onload = function () {
    let myArr = ["Learn JavaScript", "Eat cake", "Buy dog"];
    let previousArr = []; 

    //write out list 
    printlist(); 

    //GET SUBMITBUTTON AND WAIT FOR IT TO BE PRESSED
    let submitbutton = document.getElementById("additem").addEventListener("click", pushNewitem);

            //GET SORTINGBUTTON AND SORT IN ORDER A-Z 
            let sortArray = document.getElementById("orderitems").addEventListener("click", sort); 
            function sort() {
                // WHEN BUTTON IS CLICKED, SORT ITEMS ALPHABETICALLY 
                myArr.sort();
                document.getElementById("todolist").innerHTML = myArr;
                printlist(); 
            } 

    //pushes items to list
    function pushNewitem() {
            //creates variable of inputfield 
            let newitem = document.getElementById("inputitem"); 
            //adds value 
            let itemInput = newitem.value; 
        if (itemInput === "") {
            alert("You need to write something!"); 
        } else {
            // Capitalize forst letter and save in vairable 
            let capitalized = itemInput.charAt(0).toUpperCase() + itemInput.slice(1); 
    
            //push values to Ul-list
            myArr.push(capitalized); 
            newitem.value = ""; //empty before leaving 
        }
        //print out list 
        printlist(); 
    } 

    //writes list an adds to existing ul
    function printlist() {
        //get existing ul-lists 
        let ullist = document.getElementById("todolist");
        let finishedlist = document.getElementById("previousitemslist");  
        //empties ul-lists 
        ullist.innerHTML = "";
        finishedlist.innerHTML = ""; 

            //Loop how items are created and add items to empty list 
            for (let i = 0; i<myArr.length; i++) {

                //create li-tag and add to ul 
                let newLi = document.createElement("li"); 
        
                //create label to place value inside 
                let itemLabel = document.createElement("label");
                itemLabel.setAttribute("for", myArr[i]);
       
                //creates checkbox
                let checkbox = document.createElement("input"); 
                checkbox.setAttribute("type", "checkbox"); 
                checkbox.setAttribute("class", "checkbox");
                checkbox.setAttribute("id", myArr[i]);  
        
                //changes content depending on indexp 
                itemLabel.innerHTML = myArr[i]; 

                //creates remove-button
                let removebutton = document.createElement("button"); 
                removebutton.setAttribute("class", "removeitem");
                removebutton.innerHTML = "Delete"; 
        
                //places items in correct order in listtagg  
                ullist.appendChild(newLi);
                newLi.appendChild(checkbox);
                newLi.appendChild(itemLabel);
                newLi.appendChild(removebutton);
                newLi.insertBefore(checkbox, itemLabel);  

                //listen for actions on checkbox 
                checkbox.addEventListener("change", function() {
                    //splice item from array depending on position  
                    let splicedItem = myArr.splice(i, 1); 
                    //push item into empty list 
                    previousArr.push(splicedItem); 
                    printlist(); 
                }); //close checkbox

                // listen for actions on delete button   
                removebutton.addEventListener("click", function() {
                    let removedItem = myArr.splice(i, 1);
                    printlist();
                }); 
            }  //close for-loop 

    //function for list with finished items
    function doneprint() {
        //Loop how items are created and add items to empty finishedlist
        for (let i=0; i<previousArr.length; i++) {
            //create item in DOM
            let splicedItem = document.createElement("li");
            splicedItem.innerHTML = previousArr[i];

           //places li in UL 
            document.getElementById("previousitemslist").appendChild(splicedItem); 
            
            //create resetbutton for each item in previousArr
            let resetbutton = document.createElement("button"); 
            resetbutton.setAttribute("class", "resetitem");
            resetbutton.innerHTML = "Do again"; 
            
            //Places resetbutton and spliceditem in ul resp. li 
            splicedItem.appendChild(resetbutton); 
            finishedlist.appendChild(splicedItem); 
  
            //listen for event on resetbutton
            resetbutton.addEventListener("click", function() {
                let olditem = previousArr.splice(i, 1); 
                myArr.push(olditem); 
                let backSpliceItem = document.createElement("li");
                backSpliceItem.innerHTML = olditem; 
                let backToList = document.getElementById("todolist");
                backToList.appendChild(backSpliceItem);
                printlist(); 
            });  
        } //close for-loop 
    } // close donreprint 
    doneprint(); 
} // close print-function

}   //close window.onload 