import { getEvents } from './googlecalendar';
import { google } from 'googleapis';

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

import {getRefreshTokenByFirebaseUid} from './googlecalendar';

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
    // Add more assertions as needed
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
