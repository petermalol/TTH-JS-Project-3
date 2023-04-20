//TeamTreehouse project 3



//Name
let nameField = document.getElementById("name");


//Auto focus on name field upon loading the website
nameField.focus();

//Make sure user doesn't skip namefield
nameField.addEventListener("blur", () => {if(nameField.value === ""){
    document.getElementById("name-hint").style.display = "block";
    nameField.parentNode.className="not-valid"
}else{
    document.getElementById("name-hint").style.display = "none";
    nameField.parentNode.className="valid"
}})

//Job Role
//Selecting elements
let otherJobRoleField = document.getElementById("other-job-role");
let jobRoleSelect = document.getElementById("title");

//Hide other job role text field upon loading the website
hideOtherJob();

//Add event listener to the select form
jobRoleSelect.addEventListener("change", hideOtherJob);

//hides other job text field upon calling
function hideOtherJob(){
    var selectedValue = document.getElementById("title").value;
    if (selectedValue == "other"){
        otherJobRoleField.style.display = "block";
    }else{
        otherJobRoleField.style.display = "none";
    }
}



//Tshirt section
//Selecting elements
let designSelect = document.getElementById("design");
let colorSelect = document.getElementById("color");
let colorOptions = colorSelect.children;

colorSelect.disabled = true;

designSelect.addEventListener("change", updateColor);

function updateColor(){
    colorSelect.disabled = false;
    colorSelect.value = "Select a design theme above"
    for (var i = 0; i < colorOptions.length; i++){
        var design = event.target.value;
        var colorOption = colorOptions[i].getAttribute("data-theme");

        if (colorOption == design){
            colorOptions[i].hidden = false;
        }else{
            colorOptions[i].hidden = true;
        }
    }
}



//Register for Activities

//Selecting elements and declaring of variables
let activitiesBox = document.getElementById("activities-box");
let activitiesCost = document.getElementById("activities-cost");
var totalSum = 0;

activitiesBox.addEventListener("change", checkSchedule)
activitiesBox.addEventListener("change", calculateCost)

function checkSchedule(){
    let activitySchedule = activitiesBox.getElementsByTagName("INPUT");
    let SelectedActivity = event.target;

    //loop over all activites and if the selected activity has the same time as another activity, hide the other activity
    for (var i = 0; i < activitySchedule.length; i++){
        //see if time is the same (since the schedule seems to have morning and afternoon activites) and that name differs
        if (SelectedActivity.getAttribute("data-day-and-time") == activitySchedule[i].getAttribute("data-day-and-time") && SelectedActivity.getAttribute("name") != activitySchedule[i].getAttribute("name")){
            //if conditions are met disable/enable checkbox based on if you're selecting or un-selecting option that overlaps
            if(SelectedActivity.checked){
                activitySchedule[i].disabled = true;
            } else{
                activitySchedule[i].disabled = false;
            }
        }
    }
}

function calculateCost(){
    let costOfActivity = +event.target.getAttribute("data-cost")
    if (event.target.checked){
        totalSum = totalSum + costOfActivity
    }else{
        totalSum = totalSum - costOfActivity
    }
    activitiesCost.innerHTML = "Total: $" + totalSum
}


//Add focus/blur to activities
let checkbox = activitiesBox.getElementsByTagName("INPUT");
for (let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener("focus", () => {checkbox[i].parentNode.style.borderColor = "#0949FA"})
    checkbox[i].addEventListener("blur", () => {checkbox[i].parentNode.style.borderColor = ""})
}


//Payment Info
//Selecting elements
let paymentOption = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");

//initially hide the other options
paypal.style.display = "none";
bitcoin.style.display = "none";
paymentOption.children[1].setAttribute("selected", "true");

//Eventlistener
paymentOption.addEventListener("change", changePaymentOption);

//Hides all, then displays the selected option
function changePaymentOption(){
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
    let method = event.target.value;
    document.getElementById(method).style.display = "block";
}



//Form validation
let eMail = document.getElementById("email");
let cardNr = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let cvv = document.getElementById("cvv");
let expMonth = document.getElementById("exp-month")
let expYear = document.getElementById("exp-year")
let formElement = document.getElementsByTagName("form")[0]

function validateForm(){
    let isValid = true;
    //regex expressions
    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //regex for credit card information
    let cardNrRegex = /^\d{13,16}$/;
    let zipRegex = /^\d{5}$/;
    let cvvRegex = /^\d{3}$/;
    //check that nameField has a value
    if(!nameRegex.test(nameField.value)){
        console.log("invalid name")
        isValid = false;
        document.getElementById("name-hint").style.display = "block";
        nameField.parentNode.className = "not-valid"
    }else{
        document.getElementById("name-hint").style.display = "none";
        nameField.parentNode.className = "valid"
    }
    //check that eMail is submitted and valid
    if(eMail.value === ""){
        console.log("email is required")
        isValid = false;
        document.getElementById("email-hint").style.display = "block";
        document.getElementById("email-hint").textContent = "Email is required"
        eMail.parentNode.className = "not-valid"
    }else if(!emailRegex.test(eMail.value)){
        console.log("invalid email")
        isValid = false;
        document.getElementById("email-hint").style.display = "block";
        document.getElementById("email-hint").textContent = "Email address must be formatted correctly"
        eMail.parentNode.className = "not-valid"
    }else{
        document.getElementById("email-hint").style.display = "none";
        eMail.parentNode.className = "valid"
    }
    //check that at least one activity has been chosen
    if(totalSum == 0){
        console.log("you have to register to at least 1 event")
        isValid = false;
        document.getElementById("activities-hint").style.display = "block";
        document.getElementById("activities").classList.add("not-valid");
    }else{
        document.getElementById("activities-hint").style.display = "none";
        if(document.getElementById("activities").classList.contains("not-valid")){
            document.getElementById("activities").classList.replace("not-valid","valid")
        }else{
            document.getElementById("activities").classList.add("valid")
        }
    }


    if(paymentOption.value == "credit-card"){
        //check cardNr, zip and cvv
        if (!cardNrRegex.test(cardNr.value)){
            console.log("Invalid cardNr")
            isValid = false;
            document.getElementById("cc-hint").style.display = "block";
            cardNr.parentNode.className = "not-valid"
        }else{
            document.getElementById("cc-hint").style.display = "none";
            cardNr.parentNode.className = "valid"
        }
        if (!zipRegex.test(zipCode.value)){
            console.log("Invalid Zip-code")
            isValid = false;
            document.getElementById("zip-hint").style.display = "block";
            zipCode.parentNode.className = "not-valid"
        }else{
            document.getElementById("zip-hint").style.display = "none";
            zipCode.parentNode.className = "valid"
        }
        if (!cvvRegex.test(cvv.value)){
            console.log("Invalid CVV")
            isValid = false;
            document.getElementById("cvv-hint").style.display = "block";
            cvv.parentNode.className = "not-valid"
        }else{
            document.getElementById("cvv-hint").style.display = "none";
            cvv.parentNode.className = "valid"
        }
        if(expMonth.value == "Select Date"){
            console.log("Invalid expiration date")
            isValid = false;
        }
        if(expYear.value == "Select Year"){
            console.log("Invalid expiration year")
            isValid = false;
        }
    }
    return isValid;
}

formElement.addEventListener("submit", (event) => {
    if(validateForm()){
        console.log("Registration complete. Congrats and welcome!")
    } else{
        event.preventDefault();
        console.log("Something went wrong, please review your details before trying again")
    }
});

