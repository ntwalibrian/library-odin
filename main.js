function Book (title, author, pages, isRead) {
    this.title = title;
    this.author =author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead === true ? "already read" : "not read yet"}`)
    }

}

const myLibrary = []

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}
function removeBookFromLibrary (id) {
     if (id >= 0 && id < myLibrary.length) {
        myLibrary.splice(id,1)
     } else {
        console.log('incorrecty position')
     }
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

console.table(myLibrary)
console.log(myLibrary[1].info())


function init() {
    const bookArea = document.getElementById('book-body')
    bookArea.innerHTML = ""
    myLibrary.forEach((book,index) => {
        const row = document.createElement('tr')

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title; // Set the title
        row.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author; // Set the author
        row.appendChild(authorCell);

        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages; // Set the page count
        row.appendChild(pagesCell);

        const isReadCell = document.createElement('td');
        isReadCell.textContent = book.isRead ? "Yes" : "No"; // Set read status
        row.appendChild(isReadCell)

        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "delete"
        deleteBtn.classList.add('red-button')

        deleteBtn.addEventListener('click', () => {
            removeBookFromLibrary(index); // Remove book by index
            init(); // Re-render the table
        });
        deleteCell.appendChild(deleteBtn)
        row.appendChild(deleteCell)

        const toggleCell = document.createElement("td");
        const toggleDiv = document.createElement("div")
        toggleDiv.style.display = 'flex'
        toggleDiv.style.alignItems = 'center'
        const toggleInput = document.createElement('input')
        toggleInput.type = 'checkbox'
        toggleInput.id = `checkbox-${index}`
        toggleInput.checked = book.isRead

        const label = document.createElement('label')
        label.htmlFor = `checkbox-${index}`
        label.classList.add('marker-toggle')


        toggleInput.addEventListener('change', () => {
            book.isRead = toggleInput.checked; // Update the read status
            init(); // Re-render the table to update the "Yes/No" text
        });
        
        toggleDiv.appendChild(toggleInput)
        toggleDiv.appendChild(label)
        toggleCell.appendChild(toggleDiv)

        row.appendChild(toggleCell)

        bookArea.appendChild(row)
    })
}

const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const bookName = document.getElementById('form-book').value;
    const author = document.getElementById('form-author').value;
    const pages = document.getElementById('form-pages').value;
    const status = document.getElementById('form-status').value;
    console.log(status)
    addBookToLibrary(bookName,author,pages, status === "read" )
    form.reset()
    console.log('book added')
    init()
})




init()