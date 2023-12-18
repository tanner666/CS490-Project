import {db} from 'src/lib/db'
const { google } = require('googleapis')

export const getNewTokensWithRefreshToken = async (refreshToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { tokens } = await oauth2Client.refreshAccessToken();
  return tokens;
}

export const updateRefreshToken = async (firebaseUid, refreshToken) => {
  console.log("Update Refresh Token: ", firebaseUid, " Tok: ", refreshToken);
  try {
    const updatedUser = await db.user.update({
      where: { firebaseUid: firebaseUid },
      data: { refreshToken: refreshToken },
    });
    return updatedUser;
  } catch (error) {
    // Handle or throw the error
    console.error('Error updating refresh token:', error);
    throw new Error('Unable to update refresh token');
  }
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
    console.log("No refresh token in database");
    return null;
  }
}

export const getEvents = async ({ start, end, code, uid }) => {
  const { google } = require('googleapis')
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  )

  //obtain jwt from Oauth2/ set jwt in oauth2client
  //only use authentication code if no previously stored refresh token
  //let tokens;
  const storedRefreshToken = await getRefreshTokenByFirebaseUid(uid);
  console.log("Stored Refresh Toek: ", storedRefreshToken);
  //if previous token
  //if (storedRefreshToken){
    //tokens = await getNewTokensWithRefreshToken(storedRefreshToken);
  //}
  // if no previous token
  //else{
    //let {tokens} = await oauth2Client.getToken(code)
    //updateRefreshToken(uid, tokens.refresh_token)
  //}
  //if refresh token in db already:
  let tokens = ''
  let access_tok = ''
  if (storedRefreshToken){
    oauth2Client.setCredentials({ refresh_token: storedRefreshToken });
    oauth2Client.refreshAccessToken()
      .then(response => {
          // The tokens are now updated in the OAuth2 client
          tokens = response.credentials;
          console.log("Access Token:", tokens.access_token);
          access_tok = tokens.access_token;
          // If a new refresh token is provided, save it
          if (tokens.refresh_token) {
              console.log("New Refresh Token:", tokens.refresh_token);
              // Save the new refresh token in your storage
              updateRefreshToken(uid, tokens.refresh_token)
          }
      })
      .catch(error => {
          // Handle error (e.g., refresh token might be invalid or expired)
          console.error("Error refreshing access token:", error);
      });
  }
  //if no token in db yet:
  else{
    console.log("Code in Else: ", code);
    let { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    updateRefreshToken(uid, tokens.refresh_token)
    access_tok = tokens.access_token;
  }

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
  let userCredential = tokens

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      userCredential = tokens
    }
  })

  let dist = tokens.expiry_date - Date.now() // distance in milliseconds from the expiry date
  /*let timerOne = setInterval(async () => {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: '2023-05-01T12:00:00Z',
      timeMax: '2023-05-01T12:00:01Z', //max time only one second after begin time to make a dummy call
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
  }, dist - 10000) // 10 seconds before expiry, make an API call to refresh the access token - it will automatically update within the oauth client
  */
  console.log("Start: ",start, end);
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: start,
    timeMax: end,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: 'America/New_York',
  })

  const calendarEvents = res.data.items
  if (!calendarEvents || calendarEvents.length === 0) {
    console.log('No upcoming events found.')
    return
  }

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

  return { access_tok, events }
}