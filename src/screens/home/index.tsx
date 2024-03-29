import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from 'react-native'
import { styles } from './styles'
import { Header } from '../../components/header'
import { useEffect, useState } from 'react'
import plus from '../../assets/plus.png'
import { EmptyList } from '../../ui/emptyList'
import { Todo } from '../../components/todo'
import {
  todoCreate,
  todoEdit,
  todoGetAll,
  todoRemove
} from '../../storage/todo'

export interface TodosProps {
  id: number
  name: string
  favorite: boolean
}

export function Home() {
  const [todos, setTodos] = useState<TodosProps[]>([])
  const [todo, setTodo] = useState('')

  const [isFocused, setFocus] = useState(false)

  async function fetchTodos() {
    try {
      const storage = await todoGetAll()

      setTodos(storage)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddTodo() {
    if (todo.trim() === '') return

    try {
      const newTodo = { id: Math.random(), name: todo, favorite: false }

      await todoCreate(newTodo)

      setTodos(state => [newTodo, ...state])
      setTodo('')
    } catch (error) {
      console.log(error)
    }
  }

  async function removeTodo(id: number) {
    try {
      await todoRemove(id)
      setTodos(state => state.filter(todo => todo.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveTodo(id: number) {
    return Alert.alert('Tarefa', 'Deseja deletar essa tarefa?', [
      {
        text: 'Sim',
        onPress: () => removeTodo(id)
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  async function handleToggleFavorite(id: number) {
    const todo = todos.find(todo => todo.id === id)

    if (todo) {
      const updatedTodo = {
        ...todo,
        favorite: !todo.favorite
      }

      const updatedTodos = todos.map(t => (t.id === id ? updatedTodo : t))

      try {
        await todoEdit(updatedTodo)
        setTodos(updatedTodos)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const totalCreated = todos.length
  const totalFavorite = todos.reduce((acc, todo) => {
    return todo.favorite ? acc + 1 : acc
  }, 0)

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={isFocused ? styles.focusedTextInput : styles.textInput}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={todo}
            onChangeText={setTodo}
            placeholder={
              isFocused ? 'Descrição da tarefa' : 'Adicione uma nova tarefa'
            }
            placeholderTextColor={'#808080'}
            keyboardAppearance='dark'
            onSubmitEditing={handleAddTodo}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
            <Image source={plus} />
          </TouchableOpacity>
        </View>

        <View style={styles.information}>
          <View style={styles.box}>
            <Text style={styles.created}>Criadas</Text>

            <View style={styles.circle}>
              <Text style={styles.number}>{totalCreated}</Text>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.done}>Concluídas</Text>

            <View style={styles.circle}>
              <Text style={styles.number}>{totalFavorite}</Text>
            </View>
          </View>
        </View>

        {todos.length === 0 && <View style={styles.line} />}

        <View style={styles.list}>
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Todo
                key={item.id}
                todo={item}
                onRemove={handleRemoveTodo}
                onFavorite={handleToggleFavorite}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyList />}
          />
        </View>
      </View>
    </>
  )
}
