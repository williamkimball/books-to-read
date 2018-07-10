const $ = require("jquery")

const bookCollectionModule = require("./bookCollection")
const bookListModule = require("./bookList")

const addNewBook = () => {
    const newBookTitle = $(".title-form-field").val()
    const newBookSummary = $(".summary-form-field").val()
    const newBookLength = $(".length-form-field").val()
    console.log("add button clicked", newBookTitle, newBookSummary, newBookLength);
    $("input").val("")
    $("#formArticle").toggle();
    bookCollectionModule.postBook(newBookTitle, newBookSummary, newBookLength)
        .then((response) => {
            console.log("response", response)
            bookListModule.buildBookList()
        })
}

const showForm = () => {
    $("#formArticle").toggle();
    $("#newBtn").toggle();
}

const bookForm = Object.create({}, {
    buildBookForm: {
        value: function () {
            const newButton = document.createElement("button")
            newButton.textContent = "New Book"
            newButton.id = "newBtn"
            newButton.addEventListener("click", showForm)
            $("#display-container").append(newButton)

            const formArticle = document.createElement("article")
            formArticle.id = "formArticle"


            const titleSection = document.createElement("section")

            const titleLabel = document.createElement("label")
            titleLabel.textContent = "Title: "
            titleSection.appendChild(titleLabel)

            const titleField = document.createElement("input")
            titleField.setAttribute("type", "text")
            titleField.className = "title-form-field"
            titleSection.appendChild(titleField)

            formArticle.appendChild(titleSection)

            const summarySection = document.createElement("section")

            const summaryLabel = document.createElement("label")
            summaryLabel.textContent = "Summary: "
            summarySection.appendChild(summaryLabel)

            const summaryField = document.createElement("input")
            summaryField.setAttribute("type", "tel")
            summaryField.className = "summary-form-field"
            summarySection.appendChild(summaryField)

            formArticle.appendChild(summarySection)

            const lengthSection = document.createElement("section")

            const lengthLabel = document.createElement("label")
            lengthLabel.textContent = "Page Length: "
            lengthSection.appendChild(lengthLabel)

            const lengthFieldOne = document.createElement("input")
            lengthFieldOne.setAttribute("type", "text")
            lengthFieldOne.className = "length-form-field"
            lengthSection.appendChild(lengthFieldOne)
            formArticle.appendChild(lengthSection)

            const addButton = document.createElement("button")
            addButton.textContent = "Save Book"
            addButton.id = "addBtn"
            addButton.addEventListener("click", addNewBook)
            formArticle.appendChild(addButton)

            document.querySelector("#display-container").appendChild(formArticle)
            $("#formArticle").toggle();
        }
    }
})

module.exports = bookForm
