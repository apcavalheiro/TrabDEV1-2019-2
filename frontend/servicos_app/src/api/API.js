import axios from 'axios';
import { getAuthToken } from '../components/login/AuthStorage'
const baseUrlClients = "/api/clientes/"
const baseUrlReceipts = "/api/recibos/"
const baseUrlServices = "/api/servicos/"
const baseUrlUsers = "/api/usuarios/"

//login
let config = { 'Authorization': getAuthToken() }
const accessed = async (pass) => (
  await axios.post(`${baseUrlUsers}login/`, pass, { headers: config })
)

//usuarios
const listAllUsers = async () => (
  await axios.get(`${baseUrlUsers}`, { headers: config })
)

const listUser = async (id) => (
  await axios.get(`${baseUrlUsers}` + id, { headers: config })
)

const updateUser = async (id, user) => (
  await axios.put(baseUrlUsers + id, user, { headers: config })
)

const createUser = async (user) => (
  await axios.post(baseUrlUsers, user, { headers: config })
)

const removeUser = async (id) => (
  await axios.delete(baseUrlUsers + id, { headers: config })
)

//clientes
const updateClient = async (id, client) => (
  await axios.put(baseUrlClients + id, client, { headers: config })
)

const findClientsForName = async (nome) => (
  await axios.get(`${baseUrlClients}buscar?nome=${nome}`, { headers: config })
)

const findClient = async (id) => (
  await axios.get(baseUrlClients + id, { headers: config })
)

const listAllClients = async () => (
  await axios.get(baseUrlClients, { headers: config })
)

const createClient = async (client) => (
  await axios.post(baseUrlClients, client, { headers: config })
)

const removeClient = async (id) => (
  await axios.delete(baseUrlClients + id, { headers: config })
)

//recibos
const findReceiptsForClient = async (valuePath, value) => (
  await axios.get(`${baseUrlReceipts}/clientes?${valuePath}=${value}`, { headers: config })
)

const findReceiptsForService = async (valuePath, value) => (
  await axios.get(`${baseUrlReceipts}/servicos?${valuePath}=${value}`, { headers: config })
)

const removeReceipt = async (id) => (
  await axios.delete(baseUrlReceipts + id, { headers: config })
)

const listAllReceipts = async () => (
  await axios.get(baseUrlReceipts, { headers: config })
)

const findReceipt = async (id) => (
  await axios.get(baseUrlReceipts + id, { headers: config })
)

const createReceipt = async (receipt) => (
  await axios.post(baseUrlReceipts, receipt, { headers: config })
)

const updateReceipt = async (id, receipt) => (
  await axios.put(baseUrlReceipts + id, receipt, { headers: config })
)

//serviços
const findServicesForName = async (nome) => (
  await axios.get(`${baseUrlServices}/buscar?nome=${nome}`, { headers: config })
)

const removeService = async (id) => (
  await axios.delete(baseUrlServices + id, { headers: config })
)

const listAllServices = async () => (
  await axios.get(baseUrlServices, { headers: config })
)

const findService = async (id) => (
  await axios.get(baseUrlServices + id, { headers: config })
)

const createService = async (service) => (
  await axios.post(baseUrlServices, service, { headers: config })
)

const updateService = async (id, service) => (
  await axios.put(baseUrlServices + id, service, { headers: config })
)

export {
  accessed,
  listAllUsers,
  listUser,
  updateUser,
  createUser,
  removeUser,
  findClientsForName,
  updateClient,
  listAllClients,
  removeClient,
  createClient,
  findClient,
  findReceiptsForClient,
  findReceiptsForService,
  listAllReceipts,
  removeReceipt,
  findReceipt,
  createReceipt,
  updateReceipt,
  findServicesForName,
  listAllServices,
  findService,
  removeService,
  updateService,
  createService
}
