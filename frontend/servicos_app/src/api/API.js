import axios from 'axios';

const baseUrlClients = "/api/clientes/"
const baseUrlReceipts = "/api/recibos/"

const updateClient = async (id, client) => {
  return await axios.put(baseUrlClients + id, client)
}

const findClient = async (id) => {
  return await axios.get(baseUrlClients + id)
}

const listAllClients = async () => {
  return await axios.get(baseUrlClients)
}

const createClient = async (client) => {
  return await axios.post(baseUrlClients, client)
}

const removeClient = async (id) => {
  return await axios.delete(baseUrlClients + id)
}

const removeReceipt= async (id) => {
  return await axios.delete(baseUrlReceipts + id)
}

const listAllReceipts = async () => {
  return await axios.get(baseUrlReceipts)
}

const findReceipt = async (id) => {
  return await axios.get(baseUrlReceipts + id)
}

export {
  updateClient,
  listAllClients,
  removeClient,
  createClient,
  findClient,
  listAllReceipts,
  removeReceipt,
  findReceipt
}
