import * as mysql from 'mysql';

import Chirps from './chirps';
import Users from './users';

export const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'chirprapp',
    password: 'blahblah',
    database: 'chirpr'
});

export const Query = <RecievedType = mysql.OkPacket>(query: string, values?: unknown[]) => {
    return new Promise<RecievedType>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results)
        });
    });
};

export default {
    Chirps,
    Users
};