import type { Campus, Comment, Post, User } from '../types'

export const OFFICIAL: User = {
  id: 'official',
  realName: '柚园站务',
  major: '校园服务',
  enrollYear: 1902,
  nickname: '柚园站务',
  avatar: 'wisteria',
  createdAt: '2026-08-01T08:00:00.000Z',
}

const t = (d: string) => new Date(d).toISOString()

function courseGuide(campus: Campus, id: string): Post {
  return {
    id,
    boardId: 'courses',
    campus,
    title: `${campus}校区｜发帖说明：选课攻略怎么写才有用`,
    content: `这是${campus}校区的选课攻略版。柚园不会编造任何课程评价，全部由本区同学自己填写。\n\n建议写清楚：\n1. 课程全名、授课老师；\n2. 类型选一个：好课推荐 / 选课壁垒 / 给分情况 / 避雷提醒；\n3. 考核方式、平时作业量、点名严不严、是否限专业或难抢；\n4. 只写亲身经历，避免把情绪写成事实。\n\n壁垒可以包括：人数上限、专业限制、先修要求、系统里秒没、对某学院不开放等。\n\n切换左上角校区，会进入另外两个校区各自的选课攻略。`,
    authorId: 'official',
    createdAt: t('2026-08-08T08:00:00'),
    likes: [],
    pinned: true,
  }
}

function campusWelcome(campus: Campus, id: string): Post {
  return {
    id,
    boardId: 'campus',
    campus,
    title: `${campus}校区｜欢迎来到校园生活`,
    content: `这里是${campus}校区的内部生活版：宿舍日常、社团活动、图书馆、讲座资讯、二手闲置、失物招领和树洞。\n\n发帖时选一个标签，方便别人找到。闲置请写清成色和当面交易地点；失物招领写清时间地点；树洞可以只露昵称，但仍请文明。\n\n左上角可切换仙林 / 随园 / 紫金，三个校区的校园生活互不混排。`,
    authorId: 'official',
    createdAt: t('2026-08-08T08:30:00'),
    likes: [],
    pinned: true,
    campusTag: 'news',
  }
}

export const SEED_POSTS: Post[] = [
  {
    id: 'seed-xianlin-mall',
    boardId: 'mall',
    campus: '仙林',
    title: '金鹰湖滨天地怎么逛',
    content:
      '仙林校区出门往湖滨方向，金鹰湖滨天地是很多同学周末逛街的第一站。超市、服装、数码和餐饮都比较集中，晚上灯火也亮。可以坐公交或骑车过去，记得错开饭点高峰。欢迎补充哪家店值得专门跑一趟。',
    authorId: 'official',
    createdAt: t('2026-08-10T09:00:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-xianlin-fun',
    boardId: 'fun',
    campus: '仙林',
    title: '仙林湖：下课以后吹吹风',
    content:
      '仙林湖就在校区附近，傍晚走一圈很舒服，适合聊天、拍照、把作业想开一点。周末人会多一些。注意天黑后结伴，湖边风大可以带件外套。羊山公园适合跑步和野餐。',
    authorId: 'official',
    createdAt: t('2026-08-11T10:00:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-xianlin-food',
    boardId: 'food',
    campus: '仙林',
    title: '南大和园：仙林觅食根据地',
    content:
      '南大和园商业街是仙林很多同学改善伙食的地方，选择多、距离近。口味因人而异，本帖只指路，不替大家打分。欢迎在楼下写下你常点的店和避雷。',
    authorId: 'official',
    createdAt: t('2026-08-12T11:00:00'),
    likes: [],
    pinned: true,
  },
  courseGuide('仙林', 'seed-xianlin-course'),
  campusWelcome('仙林', 'seed-xianlin-campus'),

  {
    id: 'seed-suiyuan-mall',
    boardId: 'mall',
    campus: '随园',
    title: '湖南路 & 新街口',
    content:
      '随园校区出门，湖南路步行街更近，日用、小吃、小店逛起来轻松；要更大的商场可以继续往新街口方向。周末人会很多，建议早点出门或错峰。欢迎补充路线和值得跑一趟的店。',
    authorId: 'official',
    createdAt: t('2026-08-10T09:10:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-suiyuan-fun',
    boardId: 'fun',
    campus: '随园',
    title: '随园附近的玄武湖',
    content:
      '随园同学出校不远就能接到去玄武湖的路线，适合不想逛街、只想把脑子放空的下午。清凉山也可以走走。有新的展演、市集欢迎直接发帖。',
    authorId: 'official',
    createdAt: t('2026-08-11T10:20:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-suiyuan-food',
    boardId: 'food',
    campus: '随园',
    title: '湖南路 / 狮子桥一带',
    content:
      '随园校区周边餐饮更“城市”，湖南路、狮子桥附近店密、选择杂。适合想换换食堂口味的晚上。人多、排队也多，建议错峰，并注明人均和必点。',
    authorId: 'official',
    createdAt: t('2026-08-12T11:15:00'),
    likes: [],
    pinned: true,
  },
  courseGuide('随园', 'seed-suiyuan-course'),
  campusWelcome('随园', 'seed-suiyuan-campus'),

  {
    id: 'seed-zijin-mall',
    boardId: 'mall',
    campus: '紫金',
    title: '孝陵卫 / 马群怎么补给',
    content:
      '紫金校区在板仓街一带，日常补给多往孝陵卫、马群方向。周末若要更大的商场，也可以写下你常用的路线和店名，方便住在紫金的同学少走冤枉路。',
    authorId: 'official',
    createdAt: t('2026-08-10T09:20:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-zijin-fun',
    boardId: 'fun',
    campus: '紫金',
    title: '钟山风景区：中山陵与美龄宫',
    content:
      '紫金校区靠近钟山，中山陵、美龄宫是课余最近的风景。适合散步、拍照，人多时建议错开节假日高峰。有新的开放信息或小众路线，欢迎补帖。',
    authorId: 'official',
    createdAt: t('2026-08-11T10:30:00'),
    likes: [],
    pinned: true,
  },
  {
    id: 'seed-zijin-food',
    boardId: 'food',
    campus: '紫金',
    title: '卫岗 / 孝陵卫觅食',
    content:
      '紫金同学改善伙食，多往卫岗、孝陵卫小吃方向。本帖只指路，不代写评分。欢迎把常去的店、人均和避雷留给后来的紫金同学。',
    authorId: 'official',
    createdAt: t('2026-08-12T11:25:00'),
    likes: [],
    pinned: true,
  },
  courseGuide('紫金', 'seed-zijin-course'),
  campusWelcome('紫金', 'seed-zijin-campus'),
]

export const SEED_COMMENTS: Comment[] = []
