import { TODO_COLLECTION } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodosProps } from "../screens/home";

async function todoGetAll(): Promise<TodosProps[]> {
  const storage = await AsyncStorage.getItem(TODO_COLLECTION);

  return storage ? JSON.parse(storage) : [];
}

async function todoCreate(todo: TodosProps) {
  const storage = await todoGetAll()

  const updatedTodo = [todo, ...storage]

  await AsyncStorage.setItem(TODO_COLLECTION, JSON.stringify(updatedTodo))
}

async function todoEdit(todo: TodosProps) {
  const storage = await todoGetAll()

  const updatedTodo = storage.map(item => item.id === todo.id ? todo : item)

  await AsyncStorage.setItem(TODO_COLLECTION, JSON.stringify(updatedTodo))
}

async function todoRemove(id: number) {
  const storage = await todoGetAll()

  const updatedTodo = storage.filter(todo => todo.id !== id)

  await AsyncStorage.setItem(TODO_COLLECTION, JSON.stringify(updatedTodo))
}

export {
  todoGetAll,
  todoCreate,
  todoEdit,
  todoRemove
}