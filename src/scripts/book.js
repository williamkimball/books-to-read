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
    bookCollectionModule.getBook(bookId)
        .then((response) => {
            // console.log("book to be edited", response.id);
            buildEditbookForm(response)
        })
}

const buildEditbookForm = (book) => {

    $("#newBtn").toggle();
    $("#addBtn").toggle();
    $("#formArticle").toggle();
    $(".title-form-field").val(book.title)

    $(".summary-form-field").val(book.summary)

    $(".length-form-field").val(book.length)

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
    const bookTitle = $(".title-form-field").val()
    const bookSummary = $(".summary-form-field").val()
    const bookLength = $(".length-form-field").val()
    bookCollectionModule.putBook(bookId, bookTitle, bookSummary, bookLength)
        .then(() => {
            bookListModule.buildBookList()
            $("input").val("")
            $("#formArticle").toggle();

        })
}

const book = Object.create({}, {
    "createBookComponent": {
        value: function (book) {

            const bookSection = document.createElement("section")
            bookSection.id = `${book.id}`
            let checkbox = $("<input>").attr("type", "checkbox").attr("class", "checkbox")
            checkbox.appendTo(bookSection)
            $("<p>").text("Mark as read").attr("class", "labelTxt").appendTo(bookSection)

            checkbox.on("click", function () {
                if ($(this).is(":checked")) {
                    let elementId = $(this).parent().attr("id")
                    $(this).parent().toggle();
                   bookCollectionModule.toggleRead(elementId, true)
                } else {
                    bookCollectionModule.toggleRead(elementId, false)
                }
            })

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