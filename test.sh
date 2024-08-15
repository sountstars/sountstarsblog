# 压缩文件，其中 dist为要上传的文件所在目录
tar -zcvf dist.tar.gz  /Users/yulai/Desktop/sountstarsblog/docs/.vuepress/dist

# 上传到服务器（需要输入密码，如果已经进行过私钥配置，则不用），其中/home/savoygu/gusaifei 为上传文件所在目录
scp  -r dist.tar.gz root@121.40.92.55:/home/www/www.jsonhtml.cn

# 登录到服务器（需要输入密码，如果已经进行过私钥配置，则不用）
# 服务器环境开启
ssh root@121.40.92.55 << EOF

# 进入目标目录
cd /home/www/www.jsonhtml.cn
# 解压
sudo tar -zxvf dist.tar.gz --strip-components 6
# 移除线上压缩文件
sudo rm -rf 

