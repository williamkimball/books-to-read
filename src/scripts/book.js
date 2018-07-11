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
    // console.log(event.currentTarget)
    const bookId = event.currentTarget.parentNode.id
    bookCollectionModule.getBook(bookId)
        .then((response) => {
            // console.log("book to be edited", response.id);
            buildEditbookForm(response, bookId)
        })
}

const buildEditbookForm = (book, bookId) => {

    $("#newBtn").toggle();
    $("#addBtn").toggle();
    // $("#formArticle").toggle();
    console.log(document.querySelector(`#${bookId}`))

   let newTitle = $("<textArea").text($(".titleSec"))
   console.log(newTitle)

    $(".title-form-field").val(book.title).on("keyup", function () {
        if (event.keyCode === 13) {
            editExistingbook(book);
            // $("input").val("")
        }
    })

    $(".summary-form-field").val(book.summary).on("keyup", function () {
        if (event.keyCode === 13) {
            editExistingbook(book);
            // $("input").val("")
        }
    })

    $(".length-form-field").val(book.length).on("keyup", function () {
        if (event.keyCode === 13) {
            editExistingbook(book);
            // $("input").val("")
        }
    })

    // const editButton = document.createElement("button")
    // editButton.textContent = "Update";
    // editButton.id = `${book.id}`
    // editButton.className = "editBtn"




}

const editExistingbook = (book) => {
    const bookId = book.id
    // console.log(bookId);
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
            const bookArticle = document.createElement("article")
            bookArticle.id = `${book.title}-${book.id}`
            if (book.read === "false") {
                let checkbox = $("<input>").attr("type", "checkbox").attr("class", "checkbox")
                checkbox.appendTo(bookArticle)
                $("<p>").text("Mark as read").attr("class", "labelTxt").appendTo(bookArticle)

                checkbox.on("click", function () {
                    if ($(this).is(":checked")) {
                        //  console.log($(this).next().next())

                        let elementId = $(this).next().next().attr("id")
                        $(this).parent().toggle();
                        $(this).next().remove();
                        $(this).remove()
                        bookCollectionModule.toggleRead(elementId, true)
                    } else {
                        bookCollectionModule.toggleRead(elementId, false)
                    }
                })
            }

            for (key in book) {
                if (key === "id") {
                    const deleteButton = document.createElement("button")
                    deleteButton.textContent = "Delete"
                    deleteButton.addEventListener("click", deleteBook)
                    bookSection.appendChild(deleteButton)

                    // const editButton = document.createElement("button")
                    // editButton.textContent = "Edit"
                    // editButton.addEventListener("click", editBook)
                    // bookSection.appendChild(editButton)
                } else if (key === "read") {
                    if (book.read === "true") {
                        bookSection.style.display = "none";
                    }
                } else if (key === "title") {
                    const titleElement = document.createElement("h3")
                    titleElement.textContent = `Title: ${book[key]}`;
                    titleElement.className = "titleSec"
                    bookSection.appendChild(titleElement)

                    titleElement.addEventListener("click", editBook)
                }  else if (key === "summary") {
                    const summaryElement = document.createElement("p")
                    summaryElement.textContent = `Summary: ${book[key]}`
                    summaryElement.className = "summarySec"
                    bookSection.appendChild(summaryElement)

                    summaryElement.addEventListener("click", editBook)
                }  else if (key === "length") {
                    const lengthElement = document.createElement("p")
                    lengthElement.textContent = `Length: ${book[key] } pages`
                    lengthElement.className = "lengthSec"
                    bookSection.appendChild(lengthElement)

                    lengthElement.addEventListener("click", editBook)
                }
                else {
                    const paraElement = document.createElement("p")
                    paraElement.textContent = `${key}: ${book[key]}`
                    bookSection.appendChild(paraElement)
                }
            }
            bookArticle.appendChild(bookSection);

            return bookArticle
        }
    }
})

module.exports = book