import { Query } from './index';
import { IChirp } from '../../types'

const allChirps = async () => Query<IChirp[]>('SELECT * FROM chirps');
const oneChirp = async (id: number) => Query<IChirp[]>('SELECT * FROM chirps WHERE id = ?', [id]);
const createChirp = async (newChirp: IChirp) => Query(`INSERT INTO chirps SET ?`, [newChirp]);
const updateChirp = async (updateableChirp: IChirp, id: number) => Query(`UPDATE chirps SET ? WHERE id = ?`, [updateableChirp, id]);
const deleteChirp = async (id: number) => Query('DELETE FROM chirps WHERE id = ?', [id]);

export default{
    allChirps,
    oneChirp,
    createChirp,
    updateChirp,
    deleteChirp
}