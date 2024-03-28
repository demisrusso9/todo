import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from './styles'
import trashIcon from '../../assets/trash.png'
import checkIcon from '../../assets/check.png'
import uncheckIcon from '../../assets/uncheck.png'

interface TodoProps {
  todo: {
    id: number
    name: string
    favorite: boolean
  }
  onRemove: (id: number) => void
  onFavorite: (id: number) => void
}

export function Todo({ todo, onRemove, onFavorite }: TodoProps) {
  const icon = todo.favorite ? checkIcon : uncheckIcon

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onFavorite(todo.id)}>
        <Image source={icon} />
      </TouchableOpacity>

      <Text style={styles.text} numberOfLines={2}>
        {todo.name}
      </Text>

      <TouchableOpacity onPress={() => onRemove(todo.id)}>
        <Image source={trashIcon} />
      </TouchableOpacity>
    </View>
  )
}
