/*
 * This file is the plain js (jquery and prototypes) version of the interview programming exercises.
 * 
 * As the candidate, your tasks are
 *    1. load the html page into a browser and test its functionality
 *    2. note the bugs and fix them. Be prepared to explain your work. (use window.alert or a new span to put out error messages)
 *       - if you get stuck and can't make any progress, ask for help because getting some help and making progress is better
 *         than not getting anything done.
 *       2.1 explain the function pattern at the end
 *    3. extra credit: change the equation entry to free form text entry
 *       3.1 first, make it functionally equivalent to the existing entry
 *       3.2 second, allow any well formed equation using the given operators with the addition of parentheses
 *       
 */
var Equation = function() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.answer   = null;
};

Equation.prototype.compute = function(answerId) {
    this.validateOperand(this.operand1, "operand1");
    this.validateOperand(this.operand2, "operand2");

    switch (this.operator) {
    case '+':
        this.answer = this.operand1 + this.operand2;
        break;
    case '-':
        this.answer = this.operand1 - this.operand2;
        break;
    case '/':
        this.answer = this.operand1 / this.operand2;
        break;
    case '*':
        this.answer = this.operand1 * this.operand2;
        break;

    default:
        break;
    } 

    $('#answer'+answerId).text(this.answer);
};

Equation.prototype.updateOperand = function(event) {
    if (event.currentTarget.id === 'operand1') {
        this.operand1 = parseFloat($(event.currentTarget).val());
    }
    else {
        this.operand2 = parseFloat($(event.currentTarget).val());
    }
    this.operator = $("#operator option:selected").text();		
    this.compute(1);
};

Equation.prototype.updateOperator = function(event) {
    this.operator = $(event.currentTarget).val();
    this.compute(1);
};

// Validate our operands 
Equation.prototype.validateOperand = function(operand, operandId) {
    if ( isNaN(operand) ){
        alert("The operand is not a valid number!");
        $("#"+operandId).val("");
        $("#"+operandId).focus()
    }
};

//Parse free-form text into 2 operands and an operator
Equation.prototype.calculateFreeform = function(event) {
    var entry = $(event.currentTarget).val();
    if ( entry.match(/\+/) ) {
        this.operator = '+';
    }
    else if ( entry.match(/\-/) ) {
        this.operator = '-';
    }
    else if ( entry.match(/\//) ) {
        this.operator = '/';
    }
    else if ( entry.match(/\*/) ) {
        this.operator = '*';
    }
    else {
        alert("The equation '"+entry+"' is not valid.");
    }

    var operands  = entry.split(this.operator); 
    this.operand1 = parseFloat(operands[0]);
    this.operand2 = parseFloat(operands[1]);
    this.compute(2);
};

// Create an Equation object when the page loads
window.onload = function() {
    // WARNING: don't treat equation as a global variable in any changes you make
    var equation = new Equation();

    // Ensure that our new object is passed along with the event object to the function
    $('#operator').change(function(e) { equation.updateOperator(e); });
    $('.operand').change(function(e) { equation.updateOperand(e); });
    $('#freeform').change(function(e) { equation.calculateFreeform(e); });
};
