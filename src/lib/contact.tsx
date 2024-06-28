import { supabase } from '../db/supabase'
import { type Contact } from '../types/types'

const getAllContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase.from('contact').select('*')
  return data
}

const createContact = async (contact: Contact) => {
  const { data, error } = await supabase.from('contact').insert([contact])
  console.log(data)
  console.log(error)
  return data
}

export { getAllContacts, createContact }
