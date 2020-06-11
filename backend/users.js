const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  console.log("Existing USerrr", existingUser);
  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  if (existingUser) {
    return { error: "User is already taken, Bruh" };
  }

  const user = { id, name, room };
  users.push(user);
  console.log("Lets see what is in array 111 ", users);

  console.log(user.name);
  console.log("USER ISSSS", { user });
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => { return user.id === id });
  console.log("Index isss", index);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  console.log("Lets see what is in array", users);

  console.log("in users the id is", id);
  const user = users.find((user) => user.id === id);
  console.log("The user is user js is ", user);
  return user;
};

const getUsersInRoom = (room) => {
  const List = users.filter((user) => user.room === room);
  console.log("What is in the List of romm data", List);
  return List;
};

module.exports = {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
  users
};
