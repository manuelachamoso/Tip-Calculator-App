// Variables
const bill = document.getElementById('inp-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp-tip');
const people = document.getElementById('inp-people');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');

let billValue = 0.0; //default value
let tipValue = 0.15; //default value -> 15% button is active
let peopleValue = 1;


// Event Listeners
bill.addEventListener('input', setBillValue);

tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', setTipCustom);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

// Functions
function validateFloat(s) {
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue() {
    if(bill.value.includes(',')) {
        bill.value = bill.value.replace (',', '.');
    }

    if(!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick(e) {
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    
        if(e.target.innerHTML == btn.innerHTML){
        btn.classList.add('btn.active');
        tipValue = parseFloat(btn.innerHTML)/100;
        }
    });
    
    tipCustom.value = '';

    calculateTip();
}

function setTipCustom() {
    if (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    
    tipValue = parseFloat(tipCustom.value/100);

    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if (tipCustom.value !== '') {
        calculateTip();
    }
}

function setPeopleValue() {
    if (!validateInt(people.value)) {
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    if (peopleValue <= 0) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(() => {
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }
    calculateTip();
};

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results [0].innerHTML = '$' + tipAmount.toFixed(2);
        results [1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    people.Value = '1';
    setPeopleValue();
}