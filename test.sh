# 压缩文件，其中 dist为要上传的文件所在目录
tar -zcvf dist.tar.gz  /Users/yulai/Desktop/sountstars.github.io/docs/.vuepress/dist

# 上传到服务器（需要输入密码，如果已经进行过私钥配置，则不用），其中/home/savoygu/gusaifei 为上传文件所在目录
scp  -r dist.tar.gz root@111.229.45.159:/home/wwwroot/www.file.easyloact.cn

# 登录到服务器（需要输入密码，如果已经进行过私钥配置，则不用）
# 服务器环境开启
ssh root@111.229.45.159 << EOF

# 进入目标目录
cd /home/wwwroot/www.file.easyloact.cn
# 解压
sudo tar -zxvf dist.tar.gz --strip-components 1
# 移除线上压缩文件
sudo rm -rf 

