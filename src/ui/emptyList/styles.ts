import { StyleSheet } from 'react-native'

const baseText = {
  fontSize: 14,
  color: '#808080',
  lineHeight: 24,
}

export const styles = StyleSheet.create({
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    ...baseText,
    marginTop: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    ...baseText
  },
})