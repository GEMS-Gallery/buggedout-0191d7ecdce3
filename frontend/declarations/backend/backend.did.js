export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'completed' : IDL.Opt(IDL.Bool),
  });
  return IDL.Service({
    'addTodo' : IDL.Func([IDL.Text], [Result_1], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [Result], []),
    'getTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
    'toggleTodo' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
