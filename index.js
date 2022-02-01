const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id.toString());
      console.log(contactById);
      break;

    case "add":
      await addContact(name, email, phone);
      const contactsListAfterAdd = await listContacts();
      console.table(contactsListAfterAdd);
      break;

    case "remove":
      await removeContact(id.toString());
      const contactsListAfterDelete = await listContacts();
      console.table(contactsListAfterDelete);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
