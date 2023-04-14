import request from 'supertest';
import {app} from '../../index';
import {UserInterface} from '../../shared/types/interfaces';

describe('user controller', () => {
  let token = '';
  let createdUser: UserInterface;

  beforeEach(async () => {
    const user ={
      login:'user-1',
      password:'AsddfsFcv',
    };
    const response = await request(app).post('/api/login').send(user);
    
    token = response.text
  });
    

  it("should get all users", async () => {      
    const response = await request(app).get('/api/users').set('x-access-token', token);
    
    expect(response.status).toBe(200);
    expect(response.body.length >= 1).toBe(true);
  });

  it("should not get all users without token", async () => {      
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(403);
  });

  it("should get 2 users", async () => {      
    const response = await request(app).get('/api/users/sorted-users/2').set('x-access-token', token);
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should get user by id", async () => {      
    const response = await request(app).get('/api/users/10').set('x-access-token', token);
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(10);
  });

  it("should not get user by id", async () => {      
    const response = await request(app).get('/api/users/999999').set('x-access-token', token);
    
    expect(response.status).toBe(500);
  });

  it("should create a new user", async () => {      
    const user = {
      login: 'test-login-3',
      password: 'Password',
      age: 20,
      isdeleted: false,
    };
    const response = await request(app).post('/api/users').send(user).set('x-access-token', token);
    createdUser = response.body;
    expect(response.status).toBe(201);
  });

  it("should update user", async () => {    
    const getResponse = await request(app).get(`/api/users/${createdUser.id}`).set('x-access-token', token);
    const editedUser = {
      id: getResponse.body.id,
      login: getResponse.body.login,
      password: 'NewPassword',
      age: 18,
      isdeleted: getResponse.body.isdeleted,
    };

  
    expect(getResponse.body.password).toBe(createdUser.password);

    const updateResponse = await request(app).put(`/api/users/${editedUser.id}`).send(editedUser).set('x-access-token', token);
    
    expect(updateResponse.status).toBe(201);
    expect(updateResponse.body.password).toBe('NewPassword');
  });

  it("should not update user", async () => {    
    const user = {
      id: 12,
      login: 'user-4',
      password: 'NewPassword',
      age: 18,
      isdeleted: false,
    };
    const UpdateResponse = await request(app).put('/api/users/999999').send(user).set('x-access-token', token);
    
    expect(UpdateResponse.status).toBe(400);
  });

  it("should delete user", async () => {      
    const deleteResponse = await request(app).delete(`/api/users/${createdUser.id}`).set('x-access-token', token);
    
    expect(deleteResponse.status).toBe(201);
  });

  it("should not delete user", async () => {      
    const deleteResponse = await request(app).delete('/api/users/9999999').set('x-access-token', token);
    
    expect(deleteResponse.status).toBe(400);
  });
});
