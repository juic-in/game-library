import bcrypt from 'bcrypt';
import { validateEmail, validateName, validatePassword } from '../../../utils/authUtil';
import { addUser } from '../../../data/db/dbUser';

export const authRegister = async (
  username: string,
  email: string,
  password: string
) => {
  await validateEmail(email);
  await validateName(username);
  await validatePassword(password);

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await addUser({ username, email, password: hashedPassword });

  return { userId: result._id }
};

export const authLogin = async () => {

};

export const authLogout = async () => {

};
