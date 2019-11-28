const TOKEN = "token"

const setAuthToken = (token) => {
	localStorage.setItem(TOKEN, token)
}

const getAuthToken = () => {
	return localStorage.getItem(TOKEN)
}

const isLoggedIn = () => {
	return !!localStorage.getItem(TOKEN)
}

const logout = async () => {
	await localStorage.removeItem(TOKEN)
	await localStorage.removeItem('@perfilUsuario')
	await localStorage.removeItem('@nomeUsuario')
}

export {
	logout,
	setAuthToken,
	getAuthToken,
	isLoggedIn,
}