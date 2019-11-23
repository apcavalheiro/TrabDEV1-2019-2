import axios from 'axios';

const baseUrlClients = "/api/clientes/"
const baseUrlReceipts = "/api/recibos/"
const baseUrlServices = "/api/servicos/"

const updateClient = async (id, client) => (
  await axios.put(baseUrlClients + id, client)
)

const findClientsForName = async (nome) => (
  await axios.get(`${baseUrlClients}/buscar?nome=${nome}`)
)


const findClient = async (id) => (
  await axios.get(baseUrlClients + id)
)

const listAllClients = async () => (
  await axios.get(baseUrlClients)
)

const createClient = async (client) => (
  await axios.post(baseUrlClients, client)
)

const removeClient = async (id) => (
  await axios.delete(baseUrlClients + id)
)

//recibos
const findReceiptsForClient = async (valuePath, value) => (
  await axios.get(`${baseUrlReceipts}/clientes?${valuePath}=${value}`)
)

const findReceiptsForService = async (valuePath, value) => (
  await axios.get(`${baseUrlReceipts}/servicos?${valuePath}=${value}`)
)

const removeReceipt = async (id) => (
  await axios.delete(baseUrlReceipts + id)
)

const listAllReceipts = async () => (
  await axios.get(baseUrlReceipts)
)

const findReceipt = async (id) => (
  await axios.get(baseUrlReceipts + id)
)

const createReceipt = async (receipt) => (
  await axios.post(baseUrlReceipts, receipt)
)

const updateReceipt = async (id, receipt) => (
  await axios.put(baseUrlReceipts + id, receipt)
)

//serviços
const findServicesForName = async (nome) => (
  await axios.get(`${baseUrlServices}/buscar?nome=${nome}`)
)

const removeService = async (id) => (
  await axios.delete(baseUrlServices + id)
)

const listAllServices = async () => (
  await axios.get(baseUrlServices)
)

const findService = async (id) => (
  await axios.get(baseUrlServices + id)
)

const createService = async (service) => (
  await axios.post(baseUrlServices, service)
)

const updateService = async (id, service) => (
  await axios.put(baseUrlServices + id, service)
)

export {
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
