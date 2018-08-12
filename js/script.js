/************************************************************
                     Basic Info Section
************************************************************/

// Focus on the first input
$("#name").focus();


/************************************************************
                      Job Role Section
************************************************************/

// Hides the "other" input
$("#other").hide();

// Event triggered when an option is selected
$("#title").on("change", function() {
  // Loops through the options for the "Job Role"
  $(this).each(function(index, item) {
    // Shows an input when the user selects "other" as a job roll
    if ($(item).val().toLowerCase() === "other") {
      $("#other").show(100);
    } else {
      // Hides the "other" input
      $("#other").hide(100);
    }
  });
});


/************************************************************
                    T-Shirt Info Section
************************************************************/

// Show the appropriate t-shirt colors based on the the selected t-shirt
const tShirtColors = [
  `<option value="select" selected>&lt;-- Please select a T-shirt theme</option>`,

  `<option value="cornflowerblue" selected>Cornflower Blue</option>
    <option value="darkslategrey">Dark Slate Grey</option>
    <option value="gold">Gold</option>`,

  `<option value="tomato" selected>Tomato</option>
    <option value="steelblue">Steel Blue</option>
    <option value="dimgrey">Dim Grey</option>`
];

// Hides the color option
$("#color").hide();
$("#color option").remove();
//$("#color").append(`<option value="select" selected>&lt;-- Please select a T-shirt theme</option>`);

// Event triggerd when the "design" of the t-shirt is changed
$("#design").on("change", function() {
  const $currentDesign = $("#design option:selected").val().toLowerCase();

  // Shows the color option
  $("#color").show();
  $("#color option").remove();

  // Show the correct t-shirt colors based on the design chosen
  if ($currentDesign === "select") {
    $("#color").hide();
    //$("#color").append(tShirtColors[1]);
  } else if ($currentDesign === "js puns") {
    $("#color").append(tShirtColors[1]);
  } else if ($currentDesign === "heart js") {
    $("#color").append(tShirtColors[2]);
  }
});


/************************************************************
             Register for Activities Section
************************************************************/

// This function gets the day of the week exists in a string and then returns it
function day(text) {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  for (let i = 0; i < days.length; i++) {
    if (text.toLowerCase().indexOf(days[i]) !== -1) {
      return days[i];
    }
  }
}

// This function gets the time in a string and then returns it
function time(text, time) {
  const startTime = text.slice(text.indexOf("day")+4, text.indexOf("-")-2);
  const endTime = text.slice(text.indexOf("-")+1, text.indexOf(",")-2);

  if (time.toLowerCase() === "start") {
    if (text.search(startTime) !== -1) {
      return Number(startTime);
    }
  } else if (time.toLowerCase() === "end") {
    if (text.search(endTime) !== -1) {
      return Number(endTime);
    }
  }
}

let totalPrice = 0;
$(".total-price-container").hide().append('<h4>Total: $<span class="total-price"></span></h4>');

// This function gets information from the selected activity and changes the "selected" value to true or false
function activitySelected(isSelected, event) {
  for (let i = 0; i < activities.length; i++) {
    // If activity selected matches the an activity in the array
    if (activities[i].activity === event.target.parentNode) {
      // Sets the "selected" value to true or false
      activities[i].selected = isSelected;

      if (isSelected) {
        totalPrice += activities[i].price;
      } else {
        totalPrice -= activities[i].price;
      }
    }
  }

  // Dispay the total price
  if (totalPrice === 0) {
    $(".total-price-container").hide();
  } else {
    $(".total-price-container").show();
    $(".total-price").text(totalPrice);
  }
}

function disableOrEnableActivities(event) {
  let changedActivity;

  for (let i = 0; i < activities.length; i++) {
    // Checks if the activity selected or deselected, matches an activity in the array
    if (activities[i].activity === event.target.parentNode) {
      changedActivity = activities[i];
    }
  }

  for (let i = 0; i < activities.length; i++) {
    const checkbox = activities[i].activity.firstChild;
    const text = activities[i].activity;

    // Disables any activities at the same time as the one selected
    if (changedActivity !== activities[i]) {
      if (changedActivity.day === activities[i].day) {
        if (changedActivity.startTime === activities[i].startTime && changedActivity.endTime === activities[i].endTime) {
          if ($(event.target).is(":checked")) {
            activities[i].disabled = true;
            $(checkbox).attr("disabled", true);
            $(text).css("color", "grey");
          } else {
            activities[i].disabled = false;
            $(checkbox).removeAttr("disabled", true);
            $(text).css("color", "black");
          }
        }
      }
    }
  }
}

// An array that will eventually store all activities and their properties
let activities = [];

// Loops through all activities in the html and get information about them
$(".activities label").each(function(index, item) {
  // Get info on each activity
  const $text = $(item).text();
  const $title = $text.substring(1, $text.indexOf("—")-1);
  const $day = day($text);
  const $startTime = time($text, "start");
  const $endTime = time($text, "end");
  const $price = Number($text.slice($text.indexOf("$")+1, $text.length));

  // Adds the current activity and it's attributes
  activities.push({
    activity: item,
    title: $title,
    day: $day,
    startTime: $startTime,
    endTime: $endTime,
    price: $price,
    selected: false,
    disabled: false,
  });
});

// Event triggered when the input is checked or unchecked
$(".activities label input").on("change", function(event) {
  if ($(event.target).is(":checked")) {
    activitySelected(true, event);
    disableOrEnableActivities(event);
  } else {
    activitySelected(false, event);
    disableOrEnableActivities(event);
  }
});


/************************************************************
                   Payment Info Section
************************************************************/

$(".paypal").hide();
$(".bitcoin").hide();

// Hides the "Select Payment Method" option
$("#payment option:nth-child(1)").hide();

// Selects the credit card option
$("#payment option[value='credit card']").attr("selected", true);

$("#payment").on("change", function() {
  // Gets the selected payment option
  const selectedPaymentType = $("#payment option:selected").val().toLowerCase();

  // Shows the appropriate payment section based on the payment option selected
  if (selectedPaymentType === "credit card") {
    // Hides the paypal and bicoin sections
    $(".paypal").hide();
    $(".bitcoin").hide();
    $(".credit-card").show();
  } else if (selectedPaymentType === "paypal") {
    // Hides the credit card and bitcoin sections
    $(".credit-card").hide();
    $(".bitcoin").hide();
    $(".paypal").show();
  } else if (selectedPaymentType === "bitcoin") {
    // Hides the credit card and paypal sections
    $(".credit-card").hide();
    $(".paypal").hide();
    $(".bitcoin").show();
  }
});


/************************************************************
                      Form Validation
************************************************************/

// Array of error messages
const validationMessages = {
  name: "Please enter your name.",
  email: {
    empty: "Please enter a valid email address.",
    invalid: "Hmm. It looks like that email isn't formatted correctly."
  },
  activity: "Please select at least one activity.",
  creditCard: "Please enter a valid credit card number.",
  zip: "Please enter your zip code.",
  cvv: "Please enter your cvv.",
};

// Array of items that need to be validated
const needsValidation = {
  name: $("#name"),
  email: $("#mail"),
  activity: $(".activities input[name='all']"),
  creditCard: $("#cc-num"),
  zip: $("#zip"),
  cvv: $("#cvv"),
};

// Inserts the error message before each item that needs to be validated
for (let prop in needsValidation) {
  // Creates the error message
  const errorMessage = $("<p class='error'>error</p>");

  $(errorMessage).insertBefore(needsValidation[prop]);

  // Hides the error message
  $(errorMessage).hide();
}

// Displays an error message
function error(showOrHide, selector, text) {
  const error = $(selector).prev();

  if (showOrHide) {
    // Styles the error message
    $(error).css({ color: "firebrick", marginTop: "0", marginBottom: "3px" });
    // Styles the input where the error is
    $(error).next().css({ backgroundColor: "rgba(255, 25, 25, 0.4)", border: "2px solid rgba(255, 20, 20, 0.2)" });
    // Shows the message
    $(error).show();
    // Adds the text to the error message
    $(error).text(text);
  } else {
    // Hides the error error message
    $(error).hide();
    // Removes the style from where the error is
    $(error).next().css({ background: "#c1deeb", border: "2px solid #c1deeb" });
  }
}

// Validates the name
function validName(realTime, e) {
  const name = $("#name").val();

  // Checks the name to make sure it is valid
  if (name.length <= 1) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["name"], validationMessages["name"]);
  } else {
    error(false, needsValidation["name"], validationMessages["name"]);
  }
}

// Validates the email
function validEmail(realTime, e) {
  const email = $("#mail").val();

  // Checks the email to make sure it is valid
  if (email.indexOf("@") === -1) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["email"], validationMessages["email"]["empty"]);
  } else if (!/^\w{1,100}[@]\w{1,100}[.][a-z]{1,100}$/.test(email)) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["email"], validationMessages["email"]["invalid"]);
  } else {
    error(false, needsValidation["email"], validationMessages["email"]);
  }
}

// Makes sure there is at least one activity selected
function validActivity(e) {
  const validActivity = $(".activities input[type='checkbox']:checked").length;

  // Checks the email to make sure it is valid
  if (!validActivity) {
    e.preventDefault();
    error(true, needsValidation["activity"], validationMessages["activity"]);
  } else {
    error(false, needsValidation["activity"], validationMessages["activity"]);
  }
}

let selectedPaymentType = $("#payment option:selected").val().toLowerCase();
$("#payment").on("change", function() {
  selectedPaymentType = $("#payment option:selected").val().toLowerCase();
});

// Validates the the credit card number
function validCreditCard(realTime, e) {
  const creditCardNumber = $("#cc-num").val();

  if (!/^\d{13,16}$/.test(creditCardNumber)) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["creditCard"], validationMessages["creditCard"]);
  } else {
    error(false, needsValidation["creditCard"], validationMessages["creditCard"]);
  }
}

// Validates the the zip code
function validZip(realTime, e) {
  const zipCode = $("#zip").val();

  if (!/^\d{5}$/.test(zipCode)) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["zip"], validationMessages["zip"]);
  } else {
    error(false, needsValidation["zip"], validationMessages["zip"]);
  }
}

// Validates the the cvv
function validCVV(realTime, e) {
  const cvv = $("#cvv").val();

  if (!/^\d{3}$/.test(cvv)) {
    if (!realTime) {
      e.preventDefault();
    }
    error(true, needsValidation["cvv"], validationMessages["cvv"]);
  } else {
    error(false, needsValidation["cvv"], validationMessages["cvv"]);
  }
}

// Real time validation for the name input
$("#name").on("keyup", function() {
  validName(true);
});
// Real time validation for the email input
$("#mail").on("keyup", function() {
  validEmail(true);
});

if (selectedPaymentType === "credit card") {
  // Real time validation for the credit card input
  $("#cc-num").on("keyup", function() {
    validCreditCard(true);
  });
  // Real time validation for the credit card input
  $("#zip").on("keyup", function() {
    validZip(true);
  });
  // Real time validation for the credit card input
  $("#cvv").on("keyup", function() {
    validCVV(true);
  });
}

// Event triggered when the form is submitted
$("form").on("submit", function(e) {
  validName(false, e);
  validEmail(false, e);
  validActivity(e);
  if (selectedPaymentType === "credit card") {
    validCreditCard(false, e);
    validZip(false, e);
    validCVV(false, e);
  }
});
