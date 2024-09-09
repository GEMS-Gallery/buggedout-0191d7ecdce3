import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface Todo {
  'id' : bigint,
  'text' : string,
  'completed' : [] | [boolean],
}
export interface _SERVICE {
  'addTodo' : ActorMethod<[string], Result_1>,
  'deleteTodo' : ActorMethod<[bigint], Result>,
  'getTodos' : ActorMethod<[], Array<Todo>>,
  'toggleTodo' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
