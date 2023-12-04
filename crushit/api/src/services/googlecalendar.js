//retrieve tokens/ make api request
import {db} from 'src/lib/db'

const { google } = require('googleapis');

async function getNewTokensWithRefreshToken(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { tokens } = await oauth2Client.refreshAccessToken();
  return tokens;
}

export const getRefreshTokenByFirebaseUid = async (firebaseUid) => {
  console.log("GetRefreshTokens: ");
  try {
    const user = await db.user.findUnique({
      where: { firebaseUid },
      select: { refreshToken: true }, // Only select the refreshToken field
    });

    if (!user) {
      throw new Error(`User with Firebase UID ${firebaseUid} not found`);
    }

    return user.refreshToken; // Return the refreshToken
  } catch (error) {
    // Handle or throw the error appropriately
    throw new Error(`Error retrieving refreshToken: ${error.message}`);
  }
}

export const getEvents = async ({ start, end, code, uid }) => {
  console.log("GetEvents: ", uid);
  //obtain Oauth2 client object
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  )

  //obtain jwt from Oauth2/ set jwt in oauth2client
  //only use authentication code if no previously stored refresh token
  let tokens;
  const storedRefreshToken = getRefreshTokenByFirebaseUid(uid);

  if (storedRefreshToken){
    tokens = await getNewTokensWithRefreshToken(storedRefreshToken);
  }
  else{
    tokens = (await oauth2Client.getToken(code)).tokens;
  }

  oauth2Client.setCredentials(tokens)
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
  let userCredential = tokens

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      userCredential = tokens
    }
  })

  let dist = tokens.expiry_date - Date.now() // distance in milliseconds from the expiry date
  let timerOne = setInterval(async () => {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: '2023-05-01T12:00:00Z',
      timeMax: '2023-05-01T12:00:01Z', //max time only one second after begin time to make a dummy call
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
  }, dist - 10000) // 10 seconds before expiry, make an API call to refresh the access token - it will automatically update within the oauth client

  //use google api to call calendar
  console.log({ tokens })
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: start,
    timeMax: end,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const calendarEvents = res.data.items
  if (!calendarEvents || calendarEvents.length === 0) {
    console.log('No upcoming events found.')
    return
  }

  //map results
  console.log('Upcoming 100 events:')
  const events = calendarEvents.map((item, i) => {
    const start = item.start.dateTime || item.start.date
    const end = item.end.dateTime || item.end.date
    const event = {
      summary: item.summary,
      description: item.description,
      start: start,
      end: end,
    }
    return event
  })

  return { code, events }
}