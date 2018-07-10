const bookCollectionModule = require("./bookCollection")

const BookList = Object.create({}, {
    "buildBookList": {
        value: function () {
            bookCollectionModule.getBooks()
                .then((response) => {
                    console.log("all books", response)
                    const currentListRef = document.querySelector(".list-books-article")
                    if (currentListRef) {
                        currentListRef.remove()
                    }
                    const booksArticle = document.createElement("article")
                    booksArticle.className = "list-books-article"
                    const bookModule = require("./book")
                    response.forEach(book => {
                        booksArticle.appendChild(bookModule.createBookComponent(book))
                    });
                    document.querySelector("#display-container").appendChild(booksArticle)
                })
        }
    }
})

module.exports = BookList
