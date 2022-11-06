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
