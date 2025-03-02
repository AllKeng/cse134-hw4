const form = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const commentsField = document.getElementById('comments');
const errorMessage = document.getElementById('error-message');
const infoMessage = document.getElementById('info-message');
const form_errors = [];  // This will capture errors to send to the server
// Regular expression for email validation as per HTML specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Add event listeners to reset the validation state when retyping
[nameField, emailField, commentsField].forEach(field => {
    field.addEventListener('input', function () {
        // Reset the validity state to trigger proper styles
        field.setCustomValidity('');  // Reset custom validity
        errorMessage.style.display = 'none';  // Hide error message during input
    });
});

// Masking mechanism for illegal characters and showing the error message
function handleInputValidation(input, regex, fieldName) {
    input.addEventListener('input', function () {
        // Only check the full value of the input field, not individual characters
        if (!regex.test(input.value)) {
            input.classList.add('flash-error');
            input.classList.add('illegal');
            if(input == nameField) {
                input.setCustomValidity("Please use only letters, spaces, apostrophes, and hyphens.")
            }
            else {
                input.setCustomValidity("Please use letters, numbers, and punctuations only. No script tag allowed")
            }
            showErrorMessage(`Illegal character(s) entered in ${fieldName}. Please remove them.`);
            setTimeout(() => {
                input.classList.remove('flash-error');  // Removes the "flash-error" class
                hideErrorMessage();    // Hides the error message
            }, 4500);  // The delay time in milliseconds (4500ms = 4.5 seconds)
        } else {
            input.classList.remove('illegal');
        }
    });
}

// Function to validate email field when the user exits the input (on blur)
function validateEmailOnBlur(input, regex, fieldName) {
    input.addEventListener('blur', function () {
        // Check if the input matches the regex pattern when the user exits the input field
        if (!regex.test(input.value)) {
            input.classList.add('flash-error');
            input.classList.add('illegal');
            //fieldName.setCustomValidity(`${fieldName} is not valid.`);
            showErrorMessage(`${fieldName} is not valid. Please enter a valid email address.`);
            setTimeout(() => {
                input.classList.remove('flash-error');  // Removes the "flash-error" class
                hideErrorMessage();    // Hides the error message after the timeout
            }, 4500);  // The delay time in milliseconds (4500ms = 4.5 seconds)
        } else {
            input.classList.remove('illegal'); // Remove error classes if the input is valid
        }
    });
}


// Function to display error messages (just overrides previous content)
function showErrorMessage(message) {
    errorMessage.textContent = message;  // Overwrite the previous message
    errorMessage.style.display = 'block';
}

// Function to hide error messages
function hideErrorMessage() {
    errorMessage.style.display = 'none';
}

// Character count functionality for comments
commentsField.addEventListener('input', function () {
    const remaining = commentsField.maxLength - commentsField.value.length;
    infoMessage.textContent = `Remaining characters: ${remaining}`;

    if (remaining <= 50) {
        infoMessage.classList.add('warning');
    } else {
        infoMessage.classList.remove('warning');
    }

    if (remaining <= 0) {
        infoMessage.classList.add('error-message');
        infoMessage.textContent = 'Character limit reached!';
    } else {
        infoMessage.classList.remove('error-message');
    }
});


// Regular expression for name field
handleInputValidation(nameField, /^[\p{L}\s'-]+$/u, 'Name');

validateEmailOnBlur(emailField, emailRegExp, 'Email');
handleInputValidation(commentsField, /^(?!.*<script.*?>).*$/i, 'Comments');

// Form submission validation
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting by default
    form_errors.length = 0; // Clear previous errors before submitting

    // Clear previous errors before submitting
    let errors = {};

    // Check for validity using built-in validation and custom patterns
    if (!nameField.checkValidity()) {
        errors.name = nameField.validationMessage;
    }
    if (!emailField.checkValidity()) {
        errors.email = emailField.validationMessage;
    }
    if (!commentsField.checkValidity()) {
        errors.comments = commentsField.validationMessage;
    }
    console.log(nameField.checkValidity());
    console.log(emailField.checkValidity());
    console.log(commentsField.checkValidity());
    // If errors exist, send info to form submission

    if (Object.keys(errors).length > 0) {
        // Find the hidden input element for form-errors
        const formErrorsField = document.getElementById('form-errors');
        
        // Set the value of the hidden input to the JSON stringified errors object
        formErrorsField.value = JSON.stringify(errors);  // Convert errors object to string

        // Submit the form
        form.submit();  // This will now include both the form data and the form-errors
    } else {
        // If there are no errors, submit the form normally
        form.submit();
    }
});
