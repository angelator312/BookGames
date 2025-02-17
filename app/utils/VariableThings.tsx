export interface VariableInterface {
  name: string;
  value: number;
}
export interface VariableItem {
  book: string;
  user: string;
  vars: VariableCollection;
}
export interface VariableCollection {
  [key: string]: VariableInterface;
}
export function getDefaultVariable(): VariableInterface {
  return {
    value: 0,
    name: "резултат",
  };
}
export function getDefaultVariables(): VariableCollection {
  return {
    резултат:getDefaultVariable(),
  }
}
