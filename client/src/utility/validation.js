// Notes Validation
function validateNote (note) {
    if (note.length < 5 || note.length > 250) {
      return "Notes must be between 5 and 250 characters";
    } else if (/INVALID/.test(note)) {
      return "Notes cannot contain INVALID";
    } else if (!/^[a-zA-Z0-9_ /?,]+$/.test(note)) {
      return "Notes can only contain letters, numbers, underscores, spaces, /, ,, and ?";
    } else {
      return "";
    }
}

// Username Validation
function validateUsername (username) {
    if (username === '') return "Username cannot be blank";
    else return '';
}

// Password Validation
function validatePassword (password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) return "";
    else return "Password must contain 1 Uppercase letter, 1 Lowercase letter, 1 digit, 1 special character and be atleast 8 characters long";
}

module.exports = { validateNote, validateUsername, validatePassword };
