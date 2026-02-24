import Parse from "./parse";

export const getCurrentUser = () => {
  return Parse.User.current();
};

export const loginUser = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (username, password) => {
  try {
    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    await user.signUp();
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await Parse.User.logOut(); // log out from backend
  } catch (error) {
    throw error;
  }
};
