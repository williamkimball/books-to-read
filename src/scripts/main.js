// ***Story***

// As a user, I should be able to list interesting books I want to read on my dashboard

// ***Acceptance Criteria***

// *Given a user wants to enter a book
// When the user performs a gesture on a "New Book" affordance
// Then a form should be presented to the user in which the following information can be entered:

// 1. Book title
// 2. Summary
// 3. Number of pages

// *Given a user has entered in all field values for storing a new book
// When the user performs a gesture on the "Save Book" affordance
// Then the book should be saved in the database

// *Given the database contains saved books
// When a user visits the dashboard
// Then all the books should be displayed

// *Given a user wants to mark a book as read
// When the user is viewing their book list
// Then there should be a checkbox next to each book that, when clicked, should mark the book as read in the database
// And prevent the book from being displayed in the list

// *Given a user wants to edit a book title, summary or the book's number of pages
// When the user clicks on the name of a book
// Then the user should be able to edit the book title, summary or the book's number of pages
// And when the enter key is pressed, the new book information should be saved to the database
// And the dashboard should be updated to display the new book info
// And each book should have an affordance to delete the book

// *Given a user wants to remove a previously stored book
// When the user performs a gesture on the delete affordance
// Then the book should be deleted

const bookForm = require("./bookForm")
const bookList = require("./bookList")
// console.log("book form module", bookForm);


bookForm.buildBookForm() //on page load, fire the build contact form function.
bookList.buildBookList() //on page load, load the current contact list and print them to the DOM.