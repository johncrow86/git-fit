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
module.exports = { validateNote };
