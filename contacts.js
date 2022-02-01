const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactsList = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId)
    );
    return await fs.writeFile(contactsPath, newContactsList, "utf-8");
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      name,
      email,
      phone,
    };
    const newContactsList = JSON.stringify([...contacts, newContact]);
    return await fs.writeFile(contactsPath, newContactsList, "utf-8");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
