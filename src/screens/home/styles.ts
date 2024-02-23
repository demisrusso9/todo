import { StyleSheet } from 'react-native'

const textInput = {
  flex: 1,
  backgroundColor: '#262626',
  color: '#fff',
  padding: 16,
  borderRadius: 5,
  marginRight: 8,
}
export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#1a1a1a',
    padding: 20
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    marginTop: -45
  },
  textInput: {
    ...textInput
  },
  focusedTextInput: {
    ...textInput,
    borderWidth: 1,
    borderColor: '#5E60CE',
  },  
  button: {
    backgroundColor: '#1e6f9f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 5
  },
  information: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 32
  },
  box: {
    flexDirection: 'row',
  },
  circle: {
    backgroundColor: '#333',
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  number: {
    color: '#D9D9D9',
    fontWeight: 'bold',
    fontSize: 12,
  },
  created: {
    color: '#4EA8DE',
    fontSize: 14,
    fontWeight: 'bold'
  },
  done: {
    color: '#8284FA',
    fontSize: 14,
    fontWeight: 'bold'
  },
  line: {
    backgroundColor: '#333333',
    height: 1,
    width: '100%',
    marginTop: 20
  },
  list: {
    marginTop: 20
  }
})