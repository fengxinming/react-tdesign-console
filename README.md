# react-tdesign-console

基于 React 19 + React Router 8（Hash Router，纯客户端 SPA）+ TDesign React 的中后台管理模板，覆盖常见中后台页面与权限、布局、图表场景。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + React Router 8（Library 模式 / `createHashRouter`，纯 SPA，无 SSR、无服务端产物） |
| 构建 | Vite 8（`@vitejs/plugin-react`），产物 `dist/` 仅静态文件；`base` 默认为 `/${pkg.name}/`（即 `/react-tdesign-console/`），可用 `BASE_URL` 环境变量覆盖 |
| UI | `tdesign-react` + `tdesign-icons-react`；`ConfigProvider` 只承载 locale，主题走 `--td-*` CSS 变量，暗色切换 `html[theme-mode]`；样式 Stylus module + Tailwind v4 |
| 图表 / 配色 | `@visactor/react-vchart`（VChart，spec 统一经 `commons/vchart.ts` 的 `makeSpec` 注入主题；暗色主题在入口注册）；色阶用 `@ant-design/colors` 的色板算法 |
| 状态 | Zustand（persist）+ `@tanstack/react-query` |
| 请求 | axios（`app/commons/request.ts` 统一封装拦截，错误提示用 `MessagePlugin`） |
| i18n | i18next + react-i18next |
| Mock | `vite-plugin-mock-data`（`mock/` 目录，生产构建内置 Mock） |
| 开发插件 | `vite-plugin-devtools-json`（生成 devtools.json） |
| 质量 | TypeScript、oxlint、oxfmt |

## 快速开始

```bash
pnpm install
pnpm dev        # 默认端口 5173；因 base 默认带 /react-tdesign-console/，访问 http://localhost:5173/react-tdesign-console/
```

路由使用 hash，页面地址形如 `http://localhost:5173/react-tdesign-console/#/form/group`。

登录密码统一为 `admin`：账号填 `user` 登录为普通权限，其他任意账号为 admin 全量权限（mock `user.ts`）。

## 脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | Vite 开发服务器（HMR） |
| `pnpm build` | 生产构建（`dist/`，纯静态文件） |
| `pnpm preview` | 本地预览生产构建（vite preview，默认 4173 端口；base 前缀以终端输出为准） |
| `pnpm typecheck` | tsc 类型检查（不再需要路由类型生成） |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt |
| `pnpm deps` | 清空 node_modules 重装 |

## 目录结构

```
index.html              # SPA 文档壳：CSS layer 声明 + #root + 入口 script
public/images/          # 头像、登录插画、轮播图、监控封面等本地图片资源
app/
├── api/                # 纯请求函数（不含 hooks）
├── commons/            # request(axios封装, MessagePlugin 提示) / auth(权限判断) / layout(菜单过滤·trail) / html(主题落 DOM) / queryClient / types
├── components/         # 全局组件：AppProviders / AppMenu / NavigationProgress / PermissionWrapper / ErrorBoundary / 403·404·500 / HydrateFallback
├── config/             # menu.tsx（菜单+权限单一数据源）/ settings.ts（预置主题色板）/ types.ts
├── hooks/api/          # react-query hooks（useAuth / useUser / useSearchTable / useNotice / useMonitor）
├── layouts/ConsoleLayout/   # 后台布局：HeaderBar / SiderNav / TabBar / BreadcrumbNav / Footer / SettingDrawer
├── locales/            # i18n 文案（zh / en）
├── routes/             # 页面，目录命名与菜单 path 对齐（如 list/search-table/）
├── settings.json       # 默认布局配置，抽屉里「复制配置」的 JSON 可直接粘回
├── store/              # Zustand：user(登录态·权限) / layout(菜单·tabs·布局 UI，useSettingsStore 主题与设置也在此) / types；index.ts 集中跨 store 订阅
├── styles/             # app.styl（全局 TDesign 变量 / nprogress 主题色 / chart tooltip）/ global.css / _vars.styl
├── main.tsx            # SPA 入口：TDesign React19 adapter + 挂载前初始化 + createHashRouter + createRoot
├── App.tsx             # 根路由组件（Providers / 进度条 / ScrollRestoration / Outlet）；错误边界与首屏占位在 routes.ts 上配置
└── routes.ts           # 由 menu 配置生成的显式 RouteObject 路由表
mock/                   # vite-plugin-mock-data 接口模拟（生产构建同样保留）
```

## 核心机制

**启动链路**：`app/main.tsx` 在 `createRoot` 之前只做初始化——调用 `useSettingsStore.persist.rehydrate()` 还原持久化设置，注册 VChart 暗色主题，然后创建 `createHashRouter(routes)` 并渲染。跨 store 订阅在 `app/store/index.ts`（权限变化重建菜单），登录态恢复在 `app/routes.ts` 中 ConsoleLayout 路由的 `loader`，主题/语言的 DOM 副作用由 rehydrate 时的 `onRehydrateStorage` 与 `useSettingsStore.subscribe` 完成——都在首屏渲染前就绪，不会出现空态到填充态的跳变。

**菜单驱动路由**：`app/config/menu.tsx` 是唯一数据源——菜单项含 `path / name(i18n key) / icon / view(页面文件) / visible(是否进左侧导航) / per(所需权限)`。`app/routes.ts` 遍历该配置生成 `RouteObject[]`，并用 Vite 的模块表把 `view` 字符串映射成按需加载的页面（连同页面导出的 `loader`），侧边栏 / 顶部菜单 / 面包屑 / TabBar 全部由它派生。**加页面不需要手写路由。**

**数据加载**：页面级的无操作查询走路由 `loader`，组件用 `useLoaderData` / `useNavigation` 读取；带筛选/分页的查询走 react-query（`api/` 写纯函数，`hooks/api/` 写 hook）。

**权限链路**：登录接口（mock `/api/login`）下发 `permissions` → Zustand user store → `commons/layout.ts` 按菜单 `per` 字段过滤可见菜单 → 布局守卫按 `menuTrail` 拦截越权路径（为空即渲染 403）；组件级用 `<PermissionWrapper per={[...]} backup={...}>` 控制。权限判断在 `commons/auth.ts`。

**状态分层**：跨页面共享态（用户 / 主题 / 菜单 / tabs）进 Zustand；页面级服务端数据用 react-query（`api/` 写纯函数，`hooks/api/` 写 hook），不塞 Zustand。跨 store 的副作用（权限变更重建菜单、设置变更落 DOM）统一收在 `store/index.ts` 与 `store/layout.ts` 的订阅里，不在组件里写 `useEffect`。

**路由副作用**：`app/routes.ts` 中 ConsoleLayout 路由的 `middleware` 在 `next()` 之后调 `setCurrentHref(request.url)`，由 store 内部完成 `menuTrail` 计算与 tab 写入。同路由的 `loader` 只负责登录态恢复；middleware 在导航提交阶段执行，首屏不会先闪一次空菜单。

**主题与 DOM 副作用**：TDesign 的主题是 CSS 变量体系——`components/AppProviders` 的 `ConfigProvider` 只通过 `globalConfig` 传 locale；主色 `--td-brand-color-*` 系列由 `commons/html.ts` 的 `setThemeColor` 经色板算法生成后写到 `document.documentElement`（运行时换肤），暗色靠 `setTheme` 增删 `html[theme-mode='dark']`（TDesign 在 `html` 上挂亮/暗两套色盘，浮层自动跟随），色弱是 body 反色滤镜。`index.html` 声明 `@layer theme, base, tdesign, components, utilities`，`styles/global.css` 将 TDesign 样式导入 `tdesign` 层，保证 Tailwind Preflight 与组件样式的顺序稳定。

**React 19 适配**：`main.tsx` 顶部必须尽早导入 `tdesign-react/es/_util/react-19-adapter`（React 19 移除了 `ReactDOM.render`，Message / Dialog / Notification 等命令式组件依赖它动态挂载）。

**导航进度条**：`components/NavigationProgress` 基于 nprogress + `useNavigation()`，颜色取 `--td-brand-color`（`app.styl` 覆盖）。

## 组件库约定（TDesign React）

组件库统一使用 TDesign React。新增/修改页面请沿用 TDesign 的 API，常见用法速查：

| 场景 | TDesign 写法 |
|------|--------------|
| 图标 | 从 `tdesign-icons-react` 导入 `XxxIcon`；React 19 adapter 只在 `main.tsx` 引入一次，页面不再单独引入 |
| 表单 | `const [form] = Form.useForm()`；`<Form.FormItem name rules initialData>`；`await form.validate()` 返回 `true` 或错误对象 |
| 输入框 | 密码用 `type="password"`；回车用 `onEnter(value, context)`；前后缀用 `prefixIcon` / `suffix`；多行用独立 `Textarea` |
| 选择器 | `Select` 用 `options`；多选 `multiple`；日期范围用 `DateRangePicker` |
| 表格 | `data` + `columns`；列用 `colKey` / `cell: ({ row })`；列类型 `PrimaryTableCol`；`onChange(changeInfo)` 取 `changeInfo.pagination` |
| 布局间距 | `Space` 用 `direction` / `size`；`Row gutter` 可用数字或 `[水平, 垂直]`；Grid 是 12 栅格，`xs/sm/md/lg` 都是 min-width 断点 |
| 弹出层 | `Dropdown` 用 `options` + `placement` + `direction`；`Popup` 用 `visible` / `trigger`；近右边缘的子菜单应设置 `direction="left"` |
| 抽屉 / 提示 | `Drawer` 用 `visible` / `onClose`；命令式提示用 `MessagePlugin.success/error/info` |
| 数据展示 | `List.ListItem`（不是 `List.Item`）；`Descriptions items={[{ label, content }]}`；`Steps options={[{ title, content }]}` |
| 主题 / 暗色 | 主色写 `--td-brand-color-*`，暗色切 `html[theme-mode='dark']`；locale 通过 `ConfigProvider globalConfig` 传入 |

> 图表已统一迁移到 VChart：spec 经 `commons/vchart.ts` 的 `makeSpec` 注入主题（与 TDesign 明暗同步）。数据须包装成 `[{ id, values }]`。

**样式侧统一使用 TDesign**：Stylus 里不保留其他组件库的类名选择器与变量——深色/浅色用 `--td-*`（如 `--td-text-color-primary/secondary/placeholder/disabled`、`--td-bg-color-page/container/container-hover/secondarycontainer`、`--td-brand-color` 及 `--td-brand-color-1..10`、`--td-component-stroke`、`--td-success-color` / `--td-warning-color` / `--td-error-color`），覆盖组件内部结构用 `:global(.t-*)`（`t-card__body` / `t-card__header` / `t-tabs__header` / `t-tabs__content` / `t-list-item` / `t-descriptions__body` / `t-descriptions__label` / `t-skeleton__row` / `t-form__label--left` / `t-menu` / `t-submenu` / `t-row` / `t-col` / `t-pagination__select` / `t-steps` / `t-typography`）。

## 部署

项目自带两阶段 `Dockerfile`：Node 24 构建 → nginx 静态托管，并配置 history fallback（未匹配路径回退 `index.html`）。当前使用 hash 路由，静态托管与 GitHub Pages 不依赖服务端重写，Dockerfile 的回退配置作为兼容保留：

```bash
docker build -t react-tdesign-console .
docker run -p 3000:3000 react-tdesign-console
```

本地不用 Docker 时，`pnpm build` 后 `pnpm preview` 直接预览生产构建。换成任意静态服务器时，访问 `#/` 路由即可。

## 新增页面 SOP

1. `app/config/menu.tsx` 加菜单项（`path / name / icon / view / per`）
2. `app/routes/<path>/index.tsx` 写页面；样式用同目录 `style.module.styl`，类型抽 `types.ts`
3. `app/locales/zh.ts` + `en.ts` 补文案（禁止硬编码中英文）
4. `mock/` 加接口 → `app/api/` 加请求函数 → `app/hooks/api/` 加 query hook
5. `pnpm typecheck`，浏览器验证布局 / i18n / 控制台无报错
