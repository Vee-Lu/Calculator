//All the basic mathematical operations of a calculator
function add(a,b) { return a+b};
function subtract(a,b) { return a-b};
function multiply(a,b) { return a*b};
function divide(a,b) { return a/b};

//Set the a,b, and the operators to initally blank
var a = b = op =  "";

//Grab the numbers and operators element
var numbers = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operator");

//Get the display element and set the display text to be blank
var displayText = "";
var display = document.querySelector("#display");

/**
 * Function that calls one of the calculators operators depending on the operator symbol
 * @param {*} a,one of the values to be used in an operation
 * @param {*} b, one of the other values to be used in an operation
 * @param {*} op, the sign indicating which operator to use
 * @returns 
 */
function operate(a,b,op){
    switch(op){
        case "+":
            console.log("+");
            return add(a,b);
        case "-":
            console.log("-");
             return subtract(a,b);
        case "*":
            console.log("*");
            return multiply(a,b);
        default:
            console.log("/");
            return divide(a,b);
    }
}


//Event listener that displays the number clicked on the calculator
numbers.forEach(number => number.addEventListener("click", function() {
    if(op == "")
    {
        a += number.textContent;
        console.log("A: " + a);
        displayText += number.textContent;   
    }

    else 
    {
        b += number.textContent;
        console.log("B: " + b);
        displayText += number.textContent;   
    }

    display.innerText = displayText;   
}));

//Grab the clear element and when clicked, clears the A,B, and Operator elements
var clear = document.querySelector("#clear");
clear.addEventListener("click", function() { 
    displayText = ""; 
    a = b = operator = displayText; 
    display.innerText = displayText;
});

//Grab the delete element
var deleteButton = document.querySelector("#delete");
//When we press delete, it will backspace a character 
deleteButton.addEventListener("click", function(){
    //If display text is not empty, we remove the last character
    if(displayText != "")
    {
        displayText = displayText.slice(0,displayText.length-1);
        //If A, Operator and B are occupied, remove last character from B
        if (a != "" && op != "" && b!= "")
        {
            b = b.slice(0,b.length-1);
        }
        //If A and Operator are occupied, remove character from Op
        else if (a != "" && op != "")
        {
            op = "";
        }
        //If A is occupied, remove last character from A
        else if (a != "")
        {
            a = a.slice(0,a.length-1);
        }

        //Display the result to the screen
        display.innerText = displayText;
    } 
   
});

//Grab the sign element
var sign = document.querySelector("#sign");
//If the sign element is clicked, change A to positive or negative
sign.addEventListener("click", function(){
    if(a == "" || a != "" && b == "")
    {
        //If A already has a negative sign, remove it by using the slice method to get the entirety of A except for character 0, which is "-"
        if(a.includes("-"))
        {
            //Do the same thing for the displayText and show it to the screen
            a = a.slice(1,a.length);
            displayText = displayText.slice(1,displayText.length);
            display.innerText = displayText;
        }
        else
        //If A is positive, we add a negative sing to A through the use of concatenation
        {
            //Do the same thing for the displayText and show it to the screen
            a = "-" + a;
            displayText = "-" + displayText;
            display.innerText = displayText;
        }
    }
});


//Grab the decimal element
var decimal = document.querySelector("#decimal");
decimal.addEventListener("click", function(){
    //If A is not blank and the Operator is blank (add decimal after number) OR A is blank (add decimal before number)
    //Then add a decimal to A
    if(a != "" && op == "" || a == "")
    {
        if(a.includes(".")) return;

        a += decimal.innerText;
        displayText += decimal.innerText;

    }

    //If A has a number and there is an operator, we can add a decimal to B
    else if(a != "" && op != "")
    {
        if(b.includes(".")) return;
        b += decimal.innerText;
        displayText += decimal.innerText;
    }

    display.innerText = displayText;   
});

//When an operator button has been pressed, store it into the display text and have the operator variable store it
operators.forEach(operator => operator.addEventListener("click", function() {  
   
    //If a is not blank, and the operator is blank, we can add an operator
    if (a != "" && op == "")
    {
        op = operator.textContent;

        //Add the operator symbol to the display text and display it to the screen
        displayText += op;
        console.log("Op: " + op);
        display.innerText = displayText;
    } 

    //If A, B and the Operator are not blank, and we attempt to add another operator, perform an operation and store the result into A
    //before adding another operator
    if (a!= "" && b!= "" && op != "")
    {
        //Call the operation method
        operation();
        op = operator.textContent;

        //Add the operator symbol to the display text and display it to the screen
        displayText += op;
        console.log("Op: " + op);
        display.innerText = displayText;
    }
    
    
}))

//Get the equals button
var equals = document.querySelector("#equals");
//When the equal button is pressed, call the operation function
equals.addEventListener("click", operation);

/**
 * Performs a math operation
 */
function operation(){
    if(a == "" || b == "" || op == "") return;

    if(op == "/" && b == "0")
    {
        alert("Can't divide by 0!");
        return;
    }
    a = operate(+a,+b,op);
    if(!Number.isInteger(a))a = a.toFixed(6);
    b = op = "";
    display.innerText =  displayText = a;

    console.log(displayText);
    console.log("Op A: " + a);

}

  
