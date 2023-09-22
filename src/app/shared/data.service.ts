import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  BASE_URL = 'https://codichrm.azure-api.net/codicinnovationhrm';
  SUBCRIPTION_HEADER_KEY = 'Ocp-Apim-Subscription-Key';
  SUBCRIPTION_HEADER_VALUE = '06d72da1e6b44b798aabdd7c56ec613a';
  todos: Todo[] = [];

  constructor() {}

  getAllTodos() {
    return this.todos;
  }

  async getAllTodosAPI() {
    const response = await fetch(`${this.BASE_URL}/getToDos`, {
      headers: {
        'Ocp-Apim-Subscription-Key': this.SUBCRIPTION_HEADER_VALUE,
      },
    });
    this.todos = await response.json();
    return this.todos;
  }

  async addTodo(todo: Todo) {
    this.todos.push(todo);
    //const response = await fetch(`${this.BASE_URL}/getToDos`);
    const response = await fetch(`${this.BASE_URL}/addToDos`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': this.SUBCRIPTION_HEADER_VALUE,
      },
      body: JSON.stringify(todo),
    });
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
