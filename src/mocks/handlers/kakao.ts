import { http, HttpResponse } from 'msw';

export const kakaoHandlers = [
  http.post('https://kauth.kakao.com/oauth/token', async ({ request }) => {
    const body = await request.text();
    const params = new URLSearchParams(body);

    if (
      params.get('grant_type') === 'authorization_code' &&
      params.get('client_id') &&
      params.get('redirect_uri') &&
      params.get('code')
    ) {
      return HttpResponse.json(
        {
          access_token: 'mock_access_token',
          token_type: 'bearer',
          refresh_token: 'mock_refresh_token',
          expires_in: 21599,
          scope: 'account_email profile_nickname profile_image',
          refresh_token_expires_in: 5183999,
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json({ error: 'invalid_request' }, { status: 400 });
    }
  }),
];
