# 自己编译

```shell
# 使用ES文件管理器的授权密钥
docker build -t baidu-oauth-local .

docker run -d -p 13579:13579 \
  -e API_KEY="NqOMXF6XGhGRIGemsQ9nG0Na" \
  -e SECRET_KEY="SVT6xpMdLcx6v4aCR4wT8BBOTbzFO8LM" \
  -e PORT=13579 \
  baidu-oauth-local
```
# 现成docker

```shell
docker run -d -p 13579:13579 \
  -e API_KEY="NqOMXF6XGhGRIGemsQ9nG0Na" \
  -e SECRET_KEY="SVT6xpMdLcx6v4aCR4wT8BBOTbzFO8LM" \
  -e PORT=13579 \
  linkmew/baiduoauth
```
