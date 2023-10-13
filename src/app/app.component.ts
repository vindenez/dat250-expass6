import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  summary: string;
  description: string;
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];

  newTodo: Todo = {
    id: 0,
    summary: '',
    description: ''
  };

  todoIdToRetrieve: number = 0;

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>('http://localhost:8080/api/todos')
      .subscribe(data => {
        this.todos = data;
      });
  }

  addTodo() {
    this.http.post<Todo>('http://localhost:8080/api/todos', this.newTodo)
      .subscribe(data => {
        this.todos.push(data);
      });
  }

  getTodo() {  // Remove the parameter here
    if (this.todoIdToRetrieve != null) {
      this.http.get<Todo>(`http://localhost:8080/api/todos/${this.todoIdToRetrieve}`)
        .subscribe(data => {
          const index = this.todos.findIndex(todo => todo.id === data.id);
          if (index !== -1) {
            this.todos[index] = data;
          } else {
            this.todos.push(data);
          }
        });
    }
  }

  deleteTodo(id: number) {
    this.http.delete(`http://localhost:8080/api/todos/${id}`)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }
}
