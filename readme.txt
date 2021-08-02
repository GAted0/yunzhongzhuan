

零成本搭建一个无限容量云盘

本程序是由 PHP+MySQL+Cloudflare Workers 组合构建的一个无限容量云盘程序。

首先，要使用这个云盘程序，必须配合 CDN Cloudflare 的 Workers 功能来使用。

所以，你的域名需要先接入 Cloudflare，然后再开始安装程序。

网站效果：https://www.yunzhongzhuan.com

第一步、安装位于 ./install/MySQL 文件夹内的数据库文件。

第二步、修改 ./wwwroot/php/mysql.php 这个数据库连接配置文件。

第三步、把 ./wwwroot 文件夹内的所有文件，放到网站的根目录。

第四步、在 Cloudflare Workers 里分别创建两个 Worker，并绑定路由到你的网站地址之中。

可能文字无法描述清楚，我录制了创建 Worker 和绑定路由的教学视频，可以跟着视频的步骤进行创建和绑定。

视频地址：https://www.bilibili.com/video/BV1i44y117S7/

如有疑问，欢迎加入项目技术QQ交流群938268897。

我不一定在线，我可能比较忙。大家一起讨论。

群友搭建的演示地址：

https://www.yfxsoft.com/#sharefile=qrm39J26_43

https://cf.lbzt.tk
