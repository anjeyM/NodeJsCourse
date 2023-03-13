
// import request from 'supertest';
// import {Express} from 'express-serve-static-core';
// import faker from '@faker-js/faker';
// import {Sequelize} from 'sequelize';
// import {DB} from '../../models/db';
// import {createServer} from '../../index';

// beforeAll(async () => {
//     await createServer().then(() => DB.initDB());
// });

// let server: Express;

// describe('POST /api/users', () => {
//     let mockedSequelize: Sequelize;
//     beforeEach(async () => {
//       mockedSequelize = new Sequelize({
//         host: 'localhost',
//         dialect: 'postgres',
//         username: 'andrey',
//         password: '1234',
//         database: 'epam_course_users_test',
//         port: 5432,
//       });
//       await mockedSequelize.sync({ force: true });
//     })
//     afterEach(async () => {
//       jest.clearAllMocks();
//       await mockedSequelize.close();
//     })
//     it('should return 200 & valid response for valid user', async () => {
//         request(server)
//           .get(`/api/users`)
//           // .send({
//           //   id: faker.datatype.uuid(),
//           //   password: faker.internet.password(),
//           //   login: faker.internet.userName(),
//           //   age: faker.datatype.number(),
//           //   isdeleted: false,
//           // })
//           .expect(200)
//           .end(function(err: any, res: any) {
//             if (err) return err;
//             expect(res.body).toMatchObject({
//               userId: expect.stringMatching(/^[a-f0-9]{24}$/)
//             })

//           })
//       })
// })

const request = require('supertest')
const app = require('../server.js')

describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(app).get('/api/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('users')
    }),
})