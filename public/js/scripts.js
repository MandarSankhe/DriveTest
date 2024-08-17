/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function allowOnlyNum(event) {
    // Get the key code of the pressed key
    var key = event.keyCode || event.which;

    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down arrows
    if (key === 8 || key === 46 || key === 9 || key === 27 || key === 13 ||
        (key >= 35 && key <= 40)) {
        return;
    }

    // Ensure that it is a number and stop the keypress
    if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
        alert("Please enter valid input")
        event.preventDefault();
    }
}

function allowOnlyAlphabetic(event) {
    // Get the key value of the pressed key
    var key = event.key;

    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down arrows
    var allowedKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "Home", "End", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((event.ctrlKey || event.metaKey) && (key === 'a' || key === 'c' || key === 'v' || key === 'x')) {
        return;
    }

    // Allow navigation keys and shortcuts
    if (allowedKeys.includes(key)) {
        return;
    }

    // Ensure that it is an alphabetic character and the length does not exceed 8
    var isAlphabetic = /^[a-zA-Z]$/.test(key);
    if (!isAlphabetic) {
        event.preventDefault();
    }
}

function signupValidation() {
    if (document.getElementById(cnfpassword).value != document.getElementById(password).value) {
        event.preventDefault();
        alert('Password and Confirm Password should be same');
        return false;
    }

}

function logoutConfirmation() {
    if (confirm("Do you want to logout?") == true) {
        return true;
    } else {
        return false;
    }
}

function updateAvailableTimes() {
    const date = document.getElementById('date').value;
    console.log("===date", date);
    const inputElements = document.querySelectorAll('input[type="text"], input[type="number"]');
    // Create an object to store data
    const data = {};
    inputElements.forEach(input => {
        data[input.name] = input.value;
    });
    document.getElementById('hiddenDate').value = date;
    document.getElementById('hiddenData').value = JSON.stringify(data);
    document.getElementById('updateForm').submit();
}