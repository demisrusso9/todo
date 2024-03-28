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
import { useState } from 'react'
import plus from '../../assets/plus.png'
import { EmptyList } from '../../ui/emptyList'
import { Todo } from '../../components/todo'

interface TodosProps {
  id: number
  name: string
  favorite: boolean
}

export function Home() {
  const [todos, setTodos] = useState<TodosProps[]>([])
  const [todo, setTodo] = useState('')

  const [isFocused, setFocus] = useState(false)

  function handleAddTodo() {
    if (todo.trim() === '') return

    const newTodo = { id: Math.random(), name: todo, favorite: false }

    setTodos(state => [newTodo, ...state])
    setTodo('')
  }

  function handleRemoveTodo(id: number) {
    return Alert.alert('Tarefa', 'Deseja deletar essa tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          setTodos(state => state.filter(todo => todo.id !== id))
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  function handleToggleFavorite(id: number) {
    setTodos(state => [
      ...state.map(todo =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    ])
  }

  const totalCreated = todos.length
  const totalFavorite = todos.reduce((acc, todo) => {
    return todo.favorite ? acc + 1 : acc
  }, 0)

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
