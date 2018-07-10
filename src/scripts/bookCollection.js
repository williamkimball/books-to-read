const $ = require("jquery")

const bookCollection = Object.create({}, {
    "postBook": { //function for adding a completely new contact to the database.
        value: function (name, phone, address) {
            return $.ajax({
                url: "http://localhost:3000/books",
                method: "POST",
                data: {
                    title: name,
                    summary: phone,
                    length: address
                }
            })
        }
    },
    "getBooks": {
        value: function () {
            return $.ajax("http://localhost:3000/books")
        }
    },
    "deleteBook": {
        value: function (id) { //takes the id of a book, executes an ajax call on it and removes it fron the database.
            return $.ajax({
                url: `http://localhost:3000/books/${id}`, //uses id passed in to select the specific book to delete.
                method: "DELETE"
            })
        }
    },
    "getBook": {
        value: function (id) {
            return $.ajax(`http://localhost:3000/books/${id}`) //uses an ajax call to find and return the specific book
        }
    },
    "putBook": { //function to edit book and update the database
        value: function (id, name, phone, address) {
            return $.ajax({
                url: `http://localhost:3000/books/${id}`,
                method: "PUT",
                data: {
                    title: name,
                    summary: phone,
                    length: address
                }
            })
        }
    }
})

module.exports = bookCollection