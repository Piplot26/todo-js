import { Todo } from '../classes/todo.class';

import { todoList } from '../index';



//Referencias en el HTML
const divTodoList    = document.querySelector('.todo-list');
const txtImput       = document.querySelector('.new-todo');
const btnBorrar      = document.querySelector('.clear-completed');
const ulFiltros      = document.querySelector('.filters');
const anchorFiltos   = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${   (todo.completado) ? 'Completed' : ''    }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${  (todo.completado) ?'checked' : ''  }>
            <label>${ todo.tarea }</label> 
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

const div     = document.createElement('div');
div.innerHTML = htmlTodo;

divTodoList.append( div.firstElementChild );

return div.firstElementChild;

}



// EVENTOS
txtImput.addEventListener( 'keyup', ( event ) => {

    if ( event.keyCode === 13 && txtImput.value.length > 0 ) {

        console.log( txtImput.value )
        const nuevoTodo = new Todo( txtImput.value );
        todoList.nuevoTodo( nuevoTodo );
        

        crearTodoHtml( nuevoTodo );
        txtImput.value = '';
        
    }


} );

divTodoList.addEventListener( 'click', (event) => {

    // Identifica en que parte del Li hice click
    // console.log('click');
    // console.log(event.target.localName);

    const nombreElemento = (event.target.localName);//imput, label, button
    const todoElemento   = (event.target.parentElement.parentElement);
    const todoId         = todoElemento.getAttribute('data-id');

    // console.log( todoElemento );
    // console.log( todoId );

    if ( nombreElemento.includes('input') ) {//click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes( 'button' ) ){//Hay que borrar el todo
    
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }


} );

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];

        if( elemento. classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }; 
    
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if ( !filtro ) {return;}

    anchorFiltos.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro ){

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }

    }
}); 



