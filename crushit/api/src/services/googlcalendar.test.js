import { getEvents } from './googlecalendar';
import { google } from 'googleapis';
import {getRefreshTokenByFirebaseUid} from './googlecalendar';


jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => ({
        setCredentials: jest.fn(),
        refreshAccessToken: jest.fn().mockResolvedValue({ tokens: { accessToken: 'new-access-token' } }),
      })),
    },
  },
}));


jest.mock('src/lib/db', () => ({
  db: {
    user: {
      update: jest.fn().mockResolvedValue({}),
    },
  },
}));


describe('getRefreshTokenByFirebaseUid', () => {
  it('should get the refresh token', async () => {
    const updatedUser = await getRefreshTokenByFirebaseUid('firebaseUid', 'new-refresh-token');
    expect(updatedUser).toEqual(undefined);
  });
});

jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn(),
    },
    calendar: jest.fn(() => ({
      events: {
        list: jest.fn(),
      },
    })),
  },
}));

jest.mock('./googlecalendar', () => ({
  getRefreshTokenByFirebaseUid: jest.fn(),
}));

process.env.CLIENT_ID = 'your-client-id';
process.env.CLIENT_SECRET = 'your-client-secret';
process.env.REDIRECT_URL = 'your-redirect-url';

describe('getEvents', () => {
  it('should fetch calendar events for given parameters', async () => {
    //const events = await getEvents('2023-12-04T12:00:00Z','2023-12-04T12:00:00Z','232424','dasf23sdf')
  });

  /*
  it('handles no events found', async () => {
    getRefreshTokenByFirebaseUid.mockResolvedValue('mock-refresh-token');
    google.calendar().events.list.mockResolvedValue({ data: { items: [] } });

    const events = await getEvents({start:'2023-12-04T12:00:00Z', end: '2023-12-04T12:00:00Z',code:'232424',uid:'dasf23sdf'});
    expect(events.events).toEqual([]);
  });

  it('handles errors', async () => {
    getRefreshTokenByFirebaseUid.mockResolvedValue('mock-refresh-token');
    google.calendar().events.list.mockRejectedValue(new Error('API error'));

    await expect(getEvents({ start:'2023-12-04T12:00:00Z', end: '2023-12-04T12:00:00Z',code:'232424',uid:'dasf23sdf'})).rejects.toThrow('API error');
  });
  */
});
