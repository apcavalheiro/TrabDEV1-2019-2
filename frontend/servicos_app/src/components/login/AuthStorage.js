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

const isAdmin = () => (
	localStorage.getItem("@perfilUsuario") === "administrador"
)

const logout = async () => {
	await localStorage.removeItem(TOKEN)
	await localStorage.removeItem('@perfilUsuario')
	await localStorage.removeItem('@nomeUsuario')
	this.props.history.push("/")
}

export {
	isAdmin,
	logout,
	setAuthToken,
	getAuthToken,
	isLoggedIn,
}