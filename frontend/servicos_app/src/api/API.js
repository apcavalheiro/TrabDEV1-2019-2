import axios from 'axios';

const baseUrlClients = "/api/clientes/"
const baseUrlReceipts = "/api/recibos/"
const baseUrlServices = "/api/servicos/"

const updateClient = async (id, client) => (
  await axios.put(baseUrlClients + id, client)
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
  updateClient,
  listAllClients,
  removeClient,
  createClient,
  findClient,
  listAllReceipts,
  removeReceipt,
  findReceipt,
  createReceipt,
  updateReceipt,
  listAllServices,
  findService,
  removeService,
  updateService,
  createService
}
