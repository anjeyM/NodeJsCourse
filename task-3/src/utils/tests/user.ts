import faker from '@faker-js/faker';
import {sign, Secret} from 'jsonwebtoken';
import {UserInterface} from '../../shared/types/interfaces';

function dummy() {
    return {
        id: faker.datatype.uuid(),
        password: faker.internet.password(),
        login: faker.internet.userName(),
        age: faker.datatype.number(),
        isdeleted: false,
    }
}

export async function createDummy(): Promise<UserInterface> {
    const user = dummy()
    return {...user}
}
  
export async function createDummyAndAuthorize(): Promise<any> {
    const user = await createDummy();
    const payload  = {"id": user.id, "login": user.login, "isdeleted": user.isdeleted};
    const token = sign(payload, process.env.TOKEN_KEY as Secret, {expiresIn: 3000});
    return {...user, token}
}

// export async function deleteUser(userId: string): Promise<void> {
//     const dbUser = await User.findById(userId)
//     await dbUser!.deleteOne()
// }
  