const avatar1 = 'images/avatars/avatar-1.webp';
const avatar2 = 'images/avatars/avatar-2.webp';
const avatar3 = 'images/avatars/avatar-3.webp';

const contributors = [
  { name: '秦臻宇', email: 'qingzhenyu@example.com', avatar: avatar1 },
  { name: '于涛', email: 'yuebao@example.com', avatar: avatar1 },
  { name: '宁波', email: 'ningbo@example.com', avatar: avatar2 },
  { name: '郑曦月', email: 'zhengxiyue@example.com', avatar: avatar3 },
  { name: '宁波', email: 'ningbo@example.com', avatar: avatar2 },
];

const projectTitles = [
  '企业级产品设计系统',
  '火山引擎智能应用',
  'OCR文本识别',
  '内容资源管理',
  '今日头条内容管理',
  '智能机器人',
];
const projectEnTitles = [
  'TDesign Design System',
  'The Volcano Engine',
  'OCR text recognition',
  'Content resource management',
  'Toutiao content management',
  'Intelligent Robot Project',
];

const teamNames = [
  '火山引擎智能应用团队',
  '企业级产品设计团队',
  '前端/UE小分队',
  '内容识别插件小分队',
];
const teamAvatars = [avatar1, avatar2, avatar2, avatar3];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// 管理员权限：所有菜单资源均为 ['*']（通配）
const ADMIN_PERMS = {
  'menu.dashboard.workplace': ['*'],
  'menu.dashboard.monitor': ['*'],
  'menu.visualization.dataAnalysis': ['*'],
  'menu.visualization.multiDimensionDataAnalysis': ['*'],
  'menu.list.searchTable': ['*'],
  'menu.list.cardList': ['*'],
  'menu.form.group': ['*'],
  'menu.form.step': ['*'],
  'menu.profile.basic': ['*'],
  'menu.result.success': ['*'],
  'menu.result.error': ['*'],
  'menu.exception.403': ['*'],
  'menu.exception.404': ['*'],
  'menu.exception.500': ['*'],
  'menu.user.info': ['*'],
  'menu.user.setting': ['*'],
};

// 普通用户权限：所有菜单资源均为 ['read']
const USER_PERMS = Object.fromEntries(Object.keys(ADMIN_PERMS).map((k) => [k, ['read']]));

// 角色由 token 决定：mock-token-user / mock-token-admin。
// 这样刷新页面、或 dev 下 mock 文件每次请求重新加载时，身份都不会丢。
function roleFromReq(req: any): 'user' | 'admin' {
  const auth = String(req?.headers?.authorization ?? req?.headers?.Authorization ?? '');
  return auth.includes('mock-token-user') ? 'user' : 'admin';
}

function permsForRole(role: 'user' | 'admin') {
  return role === 'admin' ? ADMIN_PERMS : USER_PERMS;
}

const ERR_CODES = {
  '0': '操作成功',
  '200': '操作成功',
  '1001': '账号不存在',
  '1002': '账号或密码错误',
  '1003': 'Token已失效，请重新登录',
  '1004': '无访问权限',
  '1005': '账号已被禁用',
  '2001': '必填字段不能为空',
  '2002': '字段格式不符合要求',
  '2003': '字段长度超出范围',
  '2004': '参数类型错误',
  '3001': '重复提交',
  '3002': '当前状态不允许执行该操作',
  '4001': '数据记录不存在',
  '5000': '服务器内部异常',
};

export default {
  'GET /api/user/info': (req: any) => {
    const role = roleFromReq(req);
    return {
      code: 200,
      message: 'ok',
      data: {
        user: {
          name: 'Jesse Feng',
          avatar: avatar1,
          jobName: '前端开发工程师',
          organizationName: '前端',
          locationName: '北京',
          accountId: 'ulbn-37238531',
          phoneNumber: '177******33',
          registrationTime: '2008-02-22 11:10:11',
          verified: true,
          email: 'fxm0016@126.com',
        },
        roles: [role],
        permissions: permsForRole(role),
      },
    };
  },
  'GET /api/user/projectList': () => ({
    code: 200,
    message: 'ok',
    data: projectTitles.map((title, index) => ({
      id: index,
      title,
      enTitle: projectEnTitles[index],
      contributors,
      contributorsLength: random(5, 100),
    })),
  }),
  'GET /api/users/teamList': () => ({
    code: 200,
    message: 'ok',
    data: teamNames.map((name, index) => ({
      name,
      avatar: teamAvatars[index],
      members: random(1, 1000),
    })),
  }),
  'GET /api/user/latestNews': () => ({
    code: 200,
    message: 'ok',
    data: Array.from({ length: 8 }, (_item, index) => ({
      id: index,
      title: '王多鱼审核了图文内容： 2021年，你过得怎么样？',
      description:
        '新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！',
      avatar: avatar1,
    })),
  }),
  'GET /api/user/verified/enterprise': () => ({
    code: 200,
    message: 'ok',
    data: {
      accountType: '企业账号',
      isVerified: true,
      verifiedTime: '2013-03-31 09:03:35',
      legalPersonName: '薛**',
      certificateType: '中国身份证',
      certificationNumber: '143************738',
      enterpriseName: '型大究包六我',
      enterpriseCertificateType: '企业营业执照',
      organizationCode: '7*******5',
    },
  }),
  'GET /api/user/verified/authList': () => ({
    code: 200,
    message: 'ok',
    data: Array.from({ length: 3 }, (_item, index) => ({
      authType: '企业证件认证',
      authContent: `企业证件认证，法人姓名${['薛', '顾', '秦'][index]}**`,
      authStatus: index === 0 ? 1 : 0,
      createdTime: ['1972-01-01 01:09:03', '1994-10-01 08:34:32', '1972-06-14 12:47:27'][index],
    })),
  }),
  'POST /api/user/saveInfo': {
    code: 200,
    message: 'ok',
    data: 'ok',
  },
  'POST /api/login': async (req: any) => {
    const body = req.body || {};
    // 简单校验：账号密码为空返回 400；密码不是 admin 返回 401
    if (!body.account || !body.password) {
      return { code: 2001, message: ERR_CODES['2001'] };
    }
    if (body.password !== 'admin') {
      return { code: 1002, message: ERR_CODES['1002'] };
    }
    const role = body.account === 'user' ? 'user' : 'admin';
    // 仅返回 token；用户资料 + 权限由 /user/info 单一来源提供
    return {
      code: 200,
      message: 'ok',
      data: { token: `mock-token-${role}` },
    };
  },
  'POST /api/register': async () => {
    return {
      code: 200,
      message: 'ok',
      data: { token: 'mock-token-user' },
    };
  },
  'POST /api/user/switch-role': async (req: any) => {
    const body = req.body || {};
    const role = body.role === 'user' ? 'user' : 'admin';
    return {
      code: 200,
      message: 'ok',
      data: { permissions: permsForRole(role), token: `mock-token-${role}` },
    };
  },
};
