import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 7878;

const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_URL = 'https://openapi.baidu.com/oauth/2.0/token';

// 获取当前文件所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 返回首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 跳转到百度授权页面
app.get('/auth', (req, res) => {
  const authUrl = new URL('https://openapi.baidu.com/oauth/2.0/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', API_KEY);
  authUrl.searchParams.set('redirect_uri', 'oob');
  authUrl.searchParams.set('scope', 'basic,netdisk');
  res.redirect(authUrl.toString());
});

// 获取 refresh_token
app.get('/get_token', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: API_KEY,
    client_secret: SECRET_KEY,
    redirect_uri: 'oob'
  });

  try {
    const resp = await fetch(`${TOKEN_URL}?${params.toString()}`);
    const data = await resp.json();
    if (data.refresh_token) {
      res.json({ refresh_token: data.refresh_token });
    } else {
      res.status(400).json(data);
    }
  } catch (err) {
    res.status(500).send('Internal error');
  }
});

// 获取 access_token
app.get('/get_access', async (req, res) => {
  const refresh_token = req.query.refresh_token;
  if (!refresh_token) return res.status(400).send('Missing refresh_token');

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: API_KEY,
    client_secret: SECRET_KEY
  });

  try {
    const resp = await fetch(`${TOKEN_URL}?${params.toString()}`, {
      headers: { 'User-Agent': 'pan.baidu.com' }
    });
    const data = await resp.json();
    if (data.access_token) {
      res.json({ access_token: data.access_token });
    } else {
      res.status(400).json(data);
    }
  } catch (err) {
    res.status(500).send('Internal error');
  }
});

app.listen(PORT, () => {
  console.log(`✅ 服务启动成功：http://localhost:${PORT}`);
});
