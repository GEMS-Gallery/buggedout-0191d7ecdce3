import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  type Todo = {
    id: Nat;
    text: Text;
    completed: ?Bool;
  };

  stable var todoCounter : Nat = 0;
  stable var todos : [Todo] = [];

  public func addTodo(text : Text) : async Result.Result<Nat, Text> {
    let newTodo : Todo = {
      id = todoCounter;
      text = text;
      completed = null;
    };
    todos := Array.append(todos, [newTodo]);
    todoCounter += 1;
    #ok(newTodo.id)
  };

  public query func getTodos() : async [Todo] {
    todos
  };

  public func deleteTodo(id : Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Nat>(id, Array.map(todos, func(t: Todo) : Nat { t.id }), Nat.equal);
    switch (index) {
      case null { #err("Todo not found") };
      case (?i) {
        todos := Array.tabulate<Todo>(todos.size() - 1, func(j : Nat) : Todo {
          if (j < i) { todos[j] } else { todos[j + 1] }
        });
        #ok(())
      };
    }
  };

  public func toggleTodo(id : Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Nat>(id, Array.map(todos, func(t: Todo) : Nat { t.id }), Nat.equal);
    switch (index) {
      case null { #err("Todo not found") };
      case (?i) {
        let updatedTodo = {
          id = todos[i].id;
          text = todos[i].text;
          completed = Option.map(todos[i].completed, func(c: Bool) : Bool { not c });
        };
        todos := Array.tabulate<Todo>(todos.size(), func(j : Nat) : Todo {
          if (j == i) { updatedTodo } else { todos[j] }
        });
        #ok(())
      };
    }
  };
}
