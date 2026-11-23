// 通知/消息 mock —— 消息中心数据结构
// 三个 Tab: message(消息) / notice(通知) / todo(待办),均带未读标记。
const notices = [
  {
    id: "1",
    tab: "message",
    name: "TDesign",
    content: "欢迎使用 TDesign 控制台,新版本已上线。",
    time: "2026-09-02 09:12",
    read: false,
    avatar: "",
  },
  {
    id: "2",
    tab: "message",
    name: "系统",
    content: "您提交的工单 #1024 已被处理。",
    time: "2026-09-02 08:30",
    read: false,
    avatar: "",
  },
  {
    id: "3",
    tab: "message",
    name: "产品动态",
    content: "数据可视化模块新增多维分析能力。",
    time: "2026-09-01 18:45",
    read: false,
    avatar: "",
  },
  {
    id: "4",
    tab: "notice",
    name: "运维",
    content: "系统将于今晚 23:00 进行例行维护,预计 30 分钟。",
    time: "2026-09-02 10:05",
    read: false,
    avatar: "",
  },
  {
    id: "5",
    tab: "notice",
    name: "安全",
    content: "检测到一次异地登录,如非本人操作请修改密码。",
    time: "2026-09-01 22:10",
    read: false,
    avatar: "",
  },
  {
    id: "6",
    tab: "notice",
    name: "公告",
    content: "中秋放假安排已发布,详见公告栏。",
    time: "2026-09-01 12:00",
    read: true,
    avatar: "",
  },
  {
    id: "7",
    tab: "todo",
    name: "Review",
    content: "你有 2 项代码评审待处理。",
    time: "2026-09-02 09:40",
    read: false,
    avatar: "",
  },
  {
    id: "8",
    tab: "todo",
    name: "周报",
    content: "本周工作周报请在周五前提交。",
    time: "2026-09-02 09:00",
    read: false,
    avatar: "",
  },
  {
    id: "9",
    tab: "todo",
    name: "部署",
    content: "Staging 环境部署任务已排队。",
    time: "2026-09-01 17:20",
    read: true,
    avatar: "",
  },
];

// 模拟新消息到达的内容池(不含 mockjs,纯 Math.random)
const INCOMING_POOL = [
  { tab: "message", name: "TDesign", content: "您关注的看板有新的数据更新。" },
  { tab: "message", name: "系统", content: "定时任务执行完成,详情请查看日志。" },
  { tab: "notice", name: "安全", content: "检测到新设备登录,请确认是否为本人操作。" },
  { tab: "notice", name: "运维", content: "服务器负载已恢复正常,可关注监控面板。" },
  { tab: "todo", name: "Review", content: "你有新的代码评审待处理。" },
  { tab: "todo", name: "周报", content: "请在本周五前提交本周工作周报。" },
];

// 把时间戳转成相对时间(实时感);种子消息 time 为固定字符串则原样返回
function relTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) {
    return "刚刚";
  }
  if (m < 60) {
    return `${m} 分钟前`;
  }
  const h = Math.floor(m / 60);
  if (h < 24) {
    return `${h} 小时前`;
  }
  return `${Math.floor(h / 24)} 天前`;
}

export default {
  "GET /api/message/list": () => {
    // 模拟新消息到达:约 40% 概率追加一条未读(顶栏 badge +1),上限 12 条避免无限增长
    if (Math.random() > 0.6) {
      const p = INCOMING_POOL[Math.floor(Math.random() * INCOMING_POOL.length)];
      const now = Date.now();
      notices.unshift({
        id: `${now}`,
        tab: p.tab,
        name: p.name,
        content: p.content,
        time: String(now),
        read: false,
        avatar: "",
      });
      if (notices.length > 12) {
        notices.length = 12;
      }
    }
    // 返回克隆:新消息 time 显示相对时间(实时感);种子消息保留原 time。read/id 稳定,markRead 仍生效。
    const data = notices.map((n) => {
      const ts = Number(n.time);
      return Number.isFinite(ts) && String(ts).length >= 12
        ? { ...n, time: relTime(ts) }
        : { ...n };
    });
    return { code: 200, message: "ok", data };
  },
  "POST /api/message/read": (req: { body?: { id?: string } }) => {
    const id = req?.body?.id;
    if (id) {
      const target = notices.find((n) => n.id === id);
      if (target) {target.read = true;}
    } else {
      notices.forEach((n) => {
        n.read = true;
      });
    }
    return { code: 200, message: "ok", data: null };
  },
  // 单条已读：供 Notification 的 markRead 调用（POST /message/read/:id）
  "POST /api/message/read/:id": (req: { params?: { id?: string } }) => {
    const id = req?.params?.id;
    const target = id ? notices.find((n) => n.id === id) : undefined;
    if (target) {target.read = true;}
    return { code: 200, message: "ok", data: null };
  },
};
