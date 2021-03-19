import { createStore } from 'redux';
import reducer from './reducers/navigation'

const store = createStore(reducer, {
	mostrarSide: false
})

export default store;