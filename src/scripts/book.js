const $ = require("jquery")
const bookCollectionModule = require("./bookCollection")
const bookListModule = require("./bookList")

const deleteBook = () => {
    console.log("delete button clicked", event.currentTarget.parentNode.id)
    const bookId = event.currentTarget.parentNode.id
    bookCollectionModule.deleteBook(bookId) //uses an ajax call to find the book that was deleted, and then runs the deletebook function to actually take it out of the database, then rebuilds the book list
        .then(() => {
            bookListModule.buildBookList()
        })
}

const editBook = () => {
    const bookId = event.currentTarget.parentNode.id
    bookCollectionModule.getbook(bookId)
        .then((response) => {
            console.log("book to be edited", response.id);
            buildEditbookForm(response)
        })
}

const buildEditbookForm = (book) => {

    $("#addBtn").hide();
    $(".name-form-field").val(book.name)

    $(".phone-form-field").val(book.phone)

    $(".addr-form-field").val(book.address)

    const editButton = document.createElement("button")
    editButton.textContent = "Update";
    editButton.id = `${book.id}`
    editButton.className = "editBtn"
    editButton.addEventListener("click", function () {
        editExistingbook(book);
        $("#addBtn").show();
        $(editButton).remove();
    })
    $("#formArticle").append(editButton)


}

const editExistingbook = (book) => {
    const bookId = book.id
    console.log(bookId);
    const bookName = $(".name-form-field").val()
    const bookPhone = $(".phone-form-field").val()
    const bookAddress = $(".addr-form-field").val()
    bookCollectionModule.putbook(bookId, bookName, bookPhone, bookAddress)
        .then(() => {
            bookListModule.buildbookList()
            $("input").val("")
        })
}

const book = Object.create({}, {
    "createBookComponent": {
        value: function (book) {

            const bookSection = document.createElement("section")
            bookSection.id = `${book.id}`

            for (key in book) {
                if (key === "id") {
                    const deleteButton = document.createElement("button")
                    deleteButton.textContent = "Delete"
                    deleteButton.addEventListener("click", deleteBook)
                    bookSection.appendChild(deleteButton)

                    const editButton = document.createElement("button")
                    editButton.textContent = "Edit"
                    editButton.addEventListener("click", editBook)
                    bookSection.appendChild(editButton)
                } else {
                    const paraElement = document.createElement("p")
                    paraElement.textContent = `${key}: ${book[key]}`
                    bookSection.appendChild(paraElement)
                }
            }

            return bookSection
        }
    }
})

module.exports = book