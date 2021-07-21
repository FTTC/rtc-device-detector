rtc-device-detector 包含了腾讯云实时音视频设备检测弹窗的源码。

```
.
├── README.md
├── examples  // 设备检测弹窗使用示例
│   └── example-react  // rtc-device-detector-react 使用示例
├── lerna.json
├── package.json
├── packages  // 设备检测弹窗源码
│   └── react  // rtc-device-detector-react 源码
└── yarn.lock
```

### 使用方式

1. 安装依赖

   ```bash
   cd rtc-device-detector
   
   yarn
   ```


2. 体验demo，以 react 版本为例

   1）修改 examples/example-react/src/app/config.js 配置文件，填入 SDKAPPID 和 SECRETKEY

   2）运行 example-react

   ```bash
   cd rtc-device-detector/examples/example-react
   
   yarn run start
   ```

   3）打开 localhost: 3000 可以看到设备检测弹窗

   
3. 修改 rtc-device-detector-react 源码

    1） 修改需要改动的逻辑代码

   2） 重新编译 rtc-device-detector-react 源码

   ```bash
   cd rtc-device-detector/packages/react
   
   yarn run build
   ```

   