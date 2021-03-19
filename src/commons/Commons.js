
import {Alert} from 'react-native';

const showAlert = (title, description) => {
	Alert.alert(
	  title,
	  description,
	  [
	    {text: 'Aceptar', onPress: () => {}}
	  ],
	  {cancelable: false},
	);
}

export {showAlert}