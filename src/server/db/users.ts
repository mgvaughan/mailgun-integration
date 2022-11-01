import { Query } from './index';
import { IUser } from '../../types'

const allUsers = async () => Query<IUser[]>('SELECT * FROM users');
const oneUser = async (id: number) => Query<IUser[]>('SELECT * FROM users WHERE id = ?', [id]);
const createUser = async (user: IUser) => Query(`INSERT INTO users SET ?`, [user]);
const updateUser = async (user: IUser, id: number) => Query(`UPDATE users SET ? WHERE id = ?`, [user, id]);
const deleteUser = async (id: number) => Query('DELETE FROM users WHERE id = ?', [id]);

export default{
    allUsers,
    oneUser,
    createUser,
    updateUser,
    deleteUser
}

