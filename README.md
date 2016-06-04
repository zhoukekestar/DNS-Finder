## 环境要求
* node运行环境

## 步骤
* 1、进入项目根目录
* 2、npm install
* 3、find www.google.com

## 说明
* 该程序是为了解析正确的域名
* 该程序是为了绕过DNS污染，使得域名能够正常解析，并能正常访问网站
* 如通过运行如下命令，能得到一个`www.google.com.txt`文件，文件包含一个json文件
```bash
>find www.google.com
```
* 结果JSON文件说明
```json
[
    {
        "dns": "209.244.0.4", // DNS的ip地址
        "ips": [
            {
                "ip": "172.217.25.68", // 解析成功后的ip地址
                "time": 82             // ping通的时间
            }
        ]
    },
    {
        "dns": "64.135.1.20",
        "ips": [
            {
                "ip": "64.233.177.106",
                "time": 268
            }
        ]
    }
]
```
* 验证DNS或IP
```bash
// 如果dns比较稳定的话，可以直接修改电脑的DNS来达到绕过DNS污染的问题

// 指定DNS来解析域名，多次解析可能结果不一样
>nslookup www.google.com 209.244.0.4
```
```bash
// DNS不稳定，但是ip速度很快的话，直接修改电脑的hosts，指定域名到对应的ip地址就行

// ping相应的ip地址，来查看连接速度
>ping 172.217.25.68
```
