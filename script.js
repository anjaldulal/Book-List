// book constructor
// function Book(title,author,isbn){
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
// }

 
// adding book to the list

function AddBook(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}



AddBook.prototype.addBookToList = function(){

    // getting the table body to append the input values to table
    const list = document.getElementById('book-list');

    // creating the table row
    const row = document.createElement('tr');

    // adding columns into the row
    row.innerHTML = `
    <td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.isbn}</td>
    <td><a href="#" class="delete-list">X</a></td>
    `;

    list.appendChild(row);
}

// show alert prototype
AddBook.prototype.showAlert = function(message, alertClassName){

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
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}

// delete book
AddBook.prototype.deleteBook = function(target){
    if(target.className === 'delete-list'){
        target.parentElement.parentElement.remove();
    }
}

// method for clearing form fields
AddBook.prototype.clearFormFields = function(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



// event listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiating a book from a Book constructor
    // const book = new Book(title, author, isbn);

    // // instatiating addBook from AddBook constructor
    const addBook = new AddBook(title,author,isbn);

    // validate the form
    if(title === '' || author === '' || isbn === ''){
        
        // error alert message
        addBook.showAlert('Please fill in all fields', 'error');



    } else {
        // passing the book object to addBook method's addBookToList
        addBook.addBookToList();

        // alert success message
        addBook.showAlert('Book has been added successfully', 'success');
    
        // clearing the form fields after submit
        addBook.clearFormFields();

    }


    e.preventDefault();
});

// event listener for delete book 
document.querySelector('#book-list').addEventListener('click', function(e){
    
    const addBook = new AddBook(title, author, isbn);

    addBook.deleteBook(e.target);

    addBook.showAlert('Book has been deleted', 'success');

    e.preventDefault();
});