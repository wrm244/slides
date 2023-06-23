import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
export default defineUserConfig({
  base: "/slides/",

  lang: "zh-CN",
  title: "河山的幻灯片存档",
  description: "河山的技术幻灯片存档",

  theme,
  head: [
    // ...

    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
