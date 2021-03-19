function navigation(state, action) {
	switch (action.type) {
		case 'SIDE_MENU': {
		  return {...state, ...action.payload}
		}
		default:
		  return state
	}
}

export default navigation;