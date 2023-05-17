// User Authentication
function authenticateUser(req, res, next) {
    console.group(req.session.authenticated)
    if (req.session.authenticated) {
      return next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
  

// Notes validation
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
  
function validateNoteMiddleware(req, res, next) {
    const note = req.body.notes;
    const error = validateNote(note);
    
    if (error) res.status(400).json({ error });
    else next();
}

// Username Validation
function validateUsername (username) {
    if (username === '') return "Username cannot be blank";
    else return '';
}

function validateUsernameMiddleware(req, res, next) {
    const username = req.body.username;
    const error = validateUsername(username);

    if (error) res.status(400).json({ error });
    else next();
}

// Password Validation
function validatePassword (password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) return '';
    else return "Password must contain 1 Uppercase letter, 1 Lowercase letter, 1 digit, 1 special character and be atleast 8 characters long";
}

function validatePasswordMiddleware(req, res, next) {
    const password = req.body.password;
    const error = validatePassword(password);
    
    if (error) res.status(400).json({ error });
    else next();
}
  

module.exports = { authenticateUser, validateNoteMiddleware, validateUsernameMiddleware, validatePasswordMiddleware };
