import request from 'supertest';
import {app} from '../../index';
import {GroupInterface} from '../../shared/types/interfaces';

describe('group controller', () => {
  let token = '';
  let createdGroup: GroupInterface;

  beforeEach(async () => {
    const user ={
      login:'user-1',
      password:'AsddfsFcv',
    };
    const response = await request(app).post('/api/login').send(user);
    
    token = response.text
  });
    

  it("should get all groups", async () => {      
    const response = await request(app).get('/api/groups').set('x-access-token', token);
    
    expect(response.status).toBe(200);
    expect(response.body.length >= 1).toBe(true);
  });

  it("should not get all groups without token", async () => {      
    const response = await request(app).get('/api/groups');
    
    expect(response.status).toBe(403);
  });

  it("should get group by id", async () => {      
    const response = await request(app).get('/api/groups/1').set('x-access-token', token);
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("should not get group by id", async () => {      
    const response = await request(app).get('/api/groups/999999').set('x-access-token', token);
    
    expect(response.status).toBe(500);
  });

  it("should create a new group", async () => {      
    const group = {
      name: 'test-group',
      permissions: ['role-1', 'role-2'],
    };
    const response = await request(app).post('/api/groups').send(group).set('x-access-token', token);
    createdGroup = response.body;
    expect(response.status).toBe(201);
  });

  it("should update group", async () => {    
    const getResponse = await request(app).get(`/api/groups/${createdGroup.id}`).set('x-access-token', token);
    const editedGroup = {
      id: getResponse.body.id,
      name: 'new-name',
      permissions: getResponse.body.permissions,
    };

    expect(getResponse.body.name).toBe(createdGroup.name);

    const updateResponse = await request(app).put(`/api/groups/${editedGroup.id}`).send(editedGroup).set('x-access-token', token);
    
    expect(updateResponse.status).toBe(201);
    expect(updateResponse.body.name).toBe('new-name');
  });

  it("should not update group", async () => {    
    const group = {
        id: 999999,
        name: 'test-group',
        permissions: ['role-11', 'role-22'],
    };
    const UpdateResponse = await request(app).put('/api/groups/999999').send(group).set('x-access-token', token);
    
    expect(UpdateResponse.status).toBe(400);
  });

  it("should delete group", async () => {      
    const deleteResponse = await request(app).delete(`/api/groups/${createdGroup.id}`).set('x-access-token', token);
    
    expect(deleteResponse.status).toBe(201);
  });

  it("should not delete group", async () => {      
    const deleteResponse = await request(app).delete('/api/groups/9999999').set('x-access-token', token);
    
    expect(deleteResponse.status).toBe(500);
  });
});
