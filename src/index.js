import './styles.css';


import { Todo, TodoList } from './classes/idex';
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

// const tarea = new Todo( 'Aprender JavaScript!!!');
// todoList.nuevoTodo( tarea ); 


// console.log( todoList );

// crearTodoHtml( tarea );


// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC123');

// setTimeout( () => {

//     localStorage.removeItem('mi-key');

// },1500 );
 