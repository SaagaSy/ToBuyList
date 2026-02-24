import Parse from "./parse";

const changeToJSObject = (parseObj) => {
  return {
    id: parseObj.id,
    title: parseObj.get("title"), // lists
    task: parseObj.get("task"), // items
    isPurchased: parseObj.get("isPurchased"),
    createdAt: parseObj.get("createdAt"),
    original: parseObj,
  };
};

export const createList = async (title) => {
  const currentUser = Parse.User.current();

  const ToDoList = Parse.Object.extend("ToDoList");
  const newList = new ToDoList();
  newList.set("title", title);
  newList.set("owner", currentUser);
  const acl = new Parse.ACL(currentUser);
  newList.setACL(acl);

  await newList.save();
  return changeToJSObject(newList);
};

export const getLists = async () => {
  const currentUser = Parse.User.current();
  const query = new Parse.Query("ToDoList");
  query.equalTo("owner", currentUser); // check for privacy
  query.descending("createdAt");
  query.select("title");

  const results = await query.find();
  return results.map(changeToJSObject);
};

export const getListTitle = async (listId) => {
  const query = new Parse.Query("ToDoList");
  query.select("title");
  const list = await query.get(listId);
  return changeToJSObject(list);
};

export const createToDoItem = async (taskName, listId) => {
  const currentUser = Parse.User.current();

  const ToDoItem = Parse.Object.extend("ToDoItem");
  const toDoItem = new ToDoItem();

  toDoItem.set("task", taskName);
  toDoItem.set("isPurchased", false);
  toDoItem.set("owner", currentUser);

  // Pointer to match item with specific list
  const ListPointer = new Parse.Object("ToDoList");
  ListPointer.id = listId; // id passed from parent
  toDoItem.set("list", ListPointer);

  // Only creator can read&write
  const acl = new Parse.ACL(currentUser);
  toDoItem.setACL(acl);

  await toDoItem.save();
  return changeToJSObject(toDoItem);
};

export const getToDoItems = async (listId) => {
  const currentUser = Parse.User.current();

  const ListPointer = new Parse.Object("ToDoList"); // pointer to the current list
  ListPointer.id = listId;

  const query = new Parse.Query("ToDoItem");
  query.equalTo("owner", currentUser); // check to which user item belongs to
  query.equalTo("list", ListPointer); // check to which list item belongs to
  query.ascending("isPurchased"); // sort by if the item is bought
  query.addDescending("createdAt");
  query.select("task", "isPurchased", "createdAt");

  const results = await query.find();
  return results.map(changeToJSObject);
};

export const toggleItem = async (itemId) => {
  const query = new Parse.Query("ToDoItem");
  const toDoItem = await query.get(itemId);
  toDoItem.set("isPurchased", !toDoItem.get("isPurchased"));
  await toDoItem.save();
};

export const deleteItem = async (itemId) => {
  const query = new Parse.Query("ToDoItem");
  const toDoItem = await query.get(itemId);
  await toDoItem.destroy();
};

export const deleteList = async (listId) => {
  const query = new Parse.Query("ToDoList");
  const list = await query.get(listId);
  await list.destroy();
};
