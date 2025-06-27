docker build -t baidu-oauth-local .

docker run -d -p 13579:13579 \
  -e API_KEY=你的AppKey \
  -e SECRET_KEY=你的SecretKey \
  -e PORT=13579 \
  baidu-oauth-local

ES浏览器授权
API_KEY="NqOMXF6XGhGRIGemsQ9nG0Na"
SECRET_KEY="SVT6xpMdLcx6v4aCR4wT8BBOTbzFO8LM"
  
