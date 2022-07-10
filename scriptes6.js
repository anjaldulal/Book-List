// using es6 class keyword for constructor class

class AddBook {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    

    // ----add book method
    addBookToList() {
        // getting the table body to append the input values to table
        const list = document.getElementById('book-list');

        // creating the html element dynamically for table row
        const row = document.createElement('tr');

        // adding columns into the row
        row.innerHTML = `
    <td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.isbn}</td>
    <td><a href="#" class="delete-list">X</a></td>
    `;

        // inserting the dynamic row into the tablw
        list.appendChild(row);
    }

    // -----alert message method for error and success
    showAlertMessage(message, alertClassName) {
        const div = document.createElement('div');
        // add classes
        div.className = `alert ${alertClassName}`;

        // add text 
        div.appendChild(document.createTextNode(message));

        // append the alert element to the body

        // get container
        const parentContainer = document.querySelector('.container');

        // get form

        const form = document.getElementById('book-form');

        // insert the alert

        parentContainer.insertBefore(div, form);

        // timeout after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // -----method for deleting book from the list
    deleteBook(target) {
        if (target.className === 'delete-list') {
            target.parentElement.parentElement.remove();
        }
    }

    // -----method for clearing form fields after submit
    clearFormFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }


}

// store to local storage
class StoreToLocal{

    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBook(){
        const books = StoreToLocal.getBook();

        books.forEach(function(storedBook){

            const addBook = new AddBook(storedBook.title, storedBook.author, storedBook.isbn);

            addBook.addBookToList();
        });
    }

    static storeBook(addedBook){

        const books = StoreToLocal.getBook();

        books.push(addedBook);

        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(deletedBookIsbn){

       const books = StoreToLocal.getBook();

       books.forEach(function(storedBook, index){
            if(storedBook.isbn === deletedBookIsbn){
                books.splice(index,1);
            }
        }); 
        localStorage.setItem('books',JSON.stringify(books));

    }
}

// event listener for displaying books stored in local storage
document.addEventListener('DOMContentLoaded', StoreToLocal.displayBook);

// event listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {

    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiating a book from a Book constructor
    // const book = new Book(title, author, isbn);

    // // instatiating addBook from AddBook constructor
    const addBook = new AddBook(title, author, isbn);

    // validate the form
    if (title === '' || author === '' || isbn === '') {

        // error alert message
        addBook.showAlertMessage('Please fill in all fields', 'error');



    } else {
        // calling the method for adding book to the list
        addBook.addBookToList();

        // store book to local storage
        StoreToLocal.storeBook(addBook);

        // alert success message
        addBook.showAlertMessage('Book has been added successfully', 'success');

        // clearing the form fields after submit
        addBook.clearFormFields();

    }


    e.preventDefault();
});

// event listener for delete book 
document.querySelector('#book-list').addEventListener('click', function (e) {

    const addBook = new AddBook(title, author, isbn);

    addBook.deleteBook(e.target);

    // remove form local storage
    StoreToLocal.removeBook(e.target.parentElement.previousElementSibling.textContent);

    addBook.showAlertMessage('Book has been deleted', 'success');

    e.preventDefault();
});