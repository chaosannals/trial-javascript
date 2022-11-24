# 离线包打包和安装

- offlineuser 使用者项目
- offlinepkg 包项目


| 说明                                 | 例                 |
| 一个 npm 包项目文件夹                 |	./local-module/  |
| 一个 npm 包项目文件夹 gzip 压缩文件	 |   ./module.tar.gz  |
| 一个可以下载得到资源的 url             | https://registry.npmjs.org/webpack/-/webpack-3.0.0.tgz |
| 一个格式为 pkgname@version 或 webpack@latest 的字符串       | webpack@3.0.0 或 webpack@latest |
| 一个格式为 pkgname 的字符串，等同 pkgname@latest | 	webpack |
| 一个 npm 包项目的 git url             |  git@github.com:webpack/webpack.git |

```bash
# 指定目录
npm i ../offlinepkg

# 或

# 打包文件 .tgz
# offlinepkg 下
npm pack 

# 使用包 tgz 文件
# offlineuser
npm i ../offlinepkg/offlinepkg-1.0.0.tgz
```
