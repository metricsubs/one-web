import {User} from 'leancloud-storage';

import {UserModel} from 'core/models';

export async function recoverUserSession(): Promise<UserModel | undefined> {
  const sessionToken = localStorage.getItem('sessionToken');
  if (!sessionToken) {
    return undefined;
  }
  const user = await User.become(sessionToken);
  const userModel = user.toFullJSON();
  return userModel;
}

export async function userLogin(
  email: string,
  password: string,
): Promise<UserModel> {
  const user = await User.logIn(email, password);
  const userModel = user.toFullJSON();
  const sessionToken = user.getSessionToken();
  userModel.sessionToken = sessionToken;
  localStorage.setItem('sessionToken', sessionToken);
  return userModel;
}
