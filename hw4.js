document.addEventListener("DOMContentLoaded", function () {
    const todaySpan = document.getElementById("today");

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    todaySpan.textContent = formattedDate;
});  
   function validateDob() {
    let dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}
function validateZcode() {
    const zipInput = document.getElementById("zcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zcode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    document.getElementById("zcode-error").innerHTML = "";
    return true;
}
function validateEmail() {
    const email = document.getElementById("email").value;
    if (!emailR.test(email)) {
        document.getElementById("email-error").innerHTML = "Please enter a valid email address";
        return false;
    } else {
        document.getElementById("email-error").innerHTML = "";
        return true;
    }
}
var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateUid() {
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}
function validatePassword() {
    const password = document.getElementById("password").value;
    const uid = document.getElementById("uid").value;
    const errorMessage = [];

    if (!password.match(/[a-z]/)) errorMessage.push("Enter at least one lowercase letter");
    if (!password.match(/[A-Z]/)) errorMessage.push("Enter at least one uppercase letter");
    if (!password.match(/[0-9]/)) errorMessage.push("Enter at least one number");
    if (!password.match(/[!\@#\$%&*\-_\\.+\(\)]/)) errorMessage.push("Enter at least one special character");
    if (password.includes(uid)) errorMessage.push("Password can't contain user ID");
    if (password.length < 8) errorMessage.push("Password must be at least 8 characters");

    if (errorMessage.length > 0) {
        document.getElementById("password-error").innerHTML = errorMessage.join("<br>");
        return false;
    } else {
        document.getElementById("password-error").innerHTML = "";
        return true;
    }
}
function confirmPassword() {
    password1 = document.getElementById("password").value;
    password2 = document.getElementById("rpassword").value;

    if (pword1 !== pword2) {
        document.getElementById("password2-error").innerHTML = 
        "Passwords don't match";
        return false;
    } else {
        document.getElementById("password2-error").innerHTML = 
        "Passwords match";
        return true;
    }
}
function reviewInput() {
    var formcontent = document.getElementById("signup");
    var formoutput = "<table class='output'><th colspan = '3'> Review Your Information:</th>";
    for (let i = 0; i < formcontent.length; i++) {
        if (formcontent.elements[i].value !== "") {
            switch (formcontent.elements[i].type) {
                case "checkbox":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                    }
                    break;
                default:
                    formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}
function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
window.onload = function () {
  const fname = document.getElementById("fname");
  const welcome1 = document.getElementById("welcome1");

  let user = getCookie("firstName");

  if (user !== "") {

welcome1.innerHTML = "Welcome back, " + user;
const newUserArea = document.getElementById("newUserArea");
const newUserText = document.getElementById("newUserText");
const newUserCheck = document.getElementById("newUserCheck");

newUserArea.style.display = "block";
newUserText.innerHTML = `Not ${user}? Click here to start as a new user.`;
newUserCheck.onclick = function () {
    deleteCookie("firstName");
    localStorage.clear();
    document.forms[0].reset();
    location.reload();
};
    fname.value = user;
    loadLocalData();
  } else {
    welcome1.innerHTML = "Welcome New User";
  }

  document.getElementById("remember-me").addEventListener("change", function () {
    const rememberMe = this.checked;

    if (!rememberMe) {
        // If "Remember Me" is unchecked, delete cookies
        deleteAllCookies();
        console.log("All cookies deleted because 'Remember Me' is unchecked.");
    } else {
        // If "Remember Me" is checked or rechecked, save cookies
        inputs.forEach(function (input) {
            const inputElement = document.getElementById(input.id);
            if (inputElement.value.trim() !== "") {
                setCookie(input.cookieName, inputElement.value, 30);
            }
        });
        console.log("Cookies saved because 'Remember Me' is checked.");
    }
});

  fname.addEventListener("change", function () {
    if (document.getElementById("remember-me").checked) {
        setCookie("firstName", fname.value, 2);
    }
  });
};
window.addEventListener("load", function () {
fetch("states.json")
  .then(response => response.json())
  .then(data => {
    const stateSelect = document.getElementById("state");
    stateSelect.innerHTML = "<option value=''>Select a State</option>";
data.forEach(state => {
      const opt = document.createElement("option");
      opt.value = state.code;
      opt.textContent = state.name;
      stateSelect.appendChild(opt);
    });
  })
  .catch(error => console.error("Error Loading Json:", error));
  const firstName = getCookie("firstName");
  const newUserArea = document.getElementById("newUserArea");
  const newUserText = document.getElementById("newUserText");
  const newUserCheck = document.getElementById("newUserCheck");

  if (firstName !== "") {
    newUserArea.style.display = "inline";
    newUserText.textContent = `Not ${firstName}? Click here to start as a new user.`;
  }

  newUserCheck.addEventListener("change", function () {
    if (this.checked) {
      deleteAllCookies();
      localStorage.clear();
      document.getElementById("signup").reset();
      location.reload();
    }
  });

});
const fields = ["lname", "dob", "address1", "city", "state", "zipcode", "emaddress"];

fields.forEach(id => {
  let input = document.getElementById(id);
  input.addEventListener("blur", function () {
    localStorage.setItem(id, input.value);
  });
});
function loadLocalData() {
  fields.forEach(id => {
    if (localStorage.getItem(id)) {
        document.getElementById(id).value = localStorage.getItem(id);
    }
  });
}
function deleteAllCookies() {
  document.cookie.split(";").forEach(function(cookie) {
    let eqPOS = cookie.indexOf("=");
    let name = eqPOS > -1 ? cookie.substr(0, eqPOS) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  });
}


