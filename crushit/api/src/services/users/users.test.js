
import { standard } from './users.scenarios'
import {createUser, deleteUser, users, user,} from './users'



describe('createUser', () => {
  it('should create a user', async () => {
    const input = { email: 'test@example.com', firebaseUid: '123456' };
    const userDB = await createUser({ input });
    expect(userDB).toBeDefined();
    expect(userDB.email).toBe('test@example.com');
    expect(userDB.firebaseUid).toBe('123456');
  });

  it('should throw an error if user creation fails', async () => {
    const input = { email: 'test@example.com', firebaseUid: '123456' };
    jest.spyOn(db.user, 'create').mockRejectedValue(new Error('Failed to create user'));
    await expect(createUser({ input })).rejects.toThrow('Failed to create user');
  });
});
