import { View, Image, Text } from 'react-native'
import { styles } from './styles'
import clipboard from '../../../assets/clipboard.png'

export function EmptyList() {
  return (
    <View style={styles.emptyList}>
      <Image source={clipboard} />

      <Text style={styles.title}>Você ainda não tem tarefas cadastradas</Text>

      <Text style={styles.subtitle}>
        Crie tarefas e organize seus itens a fazer
      </Text>
    </View>
  )
}
