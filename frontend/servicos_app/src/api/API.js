import axios from 'axios';

const baseUrlClients = "/api/clientes/"
const baseUrlReceipts = "/api/recibos/"

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
  updateReceipt
}
