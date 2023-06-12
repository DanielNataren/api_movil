import { DataSource } from 'typeorm';
import "dotenv/config"
import { Bootstrap } from './bootstrap';
import Content from '../modules/contents/infrastructure/models/content.model';
import User from '../modules/users/infrastructure/models/user.model';
export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Content, User],
    synchronize: true,
    logging: false,
});

export default class DatabaseBootstrap implements Bootstrap {
    initialize(): Promise<boolean | Error> {
        return new Promise((resolve, reject) => {
            dataSource.initialize()
            .then(() => {
                console.log("Database started");
                resolve(true)
            })
            .catch((error) => {
                console.log('====================================');
                console.log("Datadabase failed to start: "+error.message);
                console.log('====================================');
                reject(true)
            });
        });
    }
}