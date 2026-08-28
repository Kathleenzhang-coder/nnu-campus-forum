import type { BoardId, CampusTag, CourseTag } from '../types'

export const COURSE_TAGS: { id: CourseTag; label: string; hint: string }[] = [
  { id: 'recommend', label: '好课推荐', hint: '值得冲的课' },
  { id: 'barrier', label: '选课壁垒', hint: '难抢、限专业、有门槛' },
  { id: 'grading', label: '给分情况', hint: '给分松紧、考核方式' },
  { id: 'warning', label: '避雷提醒', hint: '体验一般，提醒后来者' },
]

export const CAMPUS_TAGS: { id: CampusTag; label: string }[] = [
  { id: 'dorm', label: '宿舍日常' },
  { id: 'club', label: '社团活动' },
  { id: 'library', label: '图书馆' },
  { id: 'news', label: '校园资讯' },
  { id: 'secondhand', label: '二手闲置' },
  { id: 'lost', label: '失物招领' },
  { id: 'treehole', label: '吐槽树洞' },
]

export const BOARDS: Record<
  BoardId,
  {
    name: string
    blurb: string
    parent?: string
    parentPath?: string
    emoji: string
    composeHint: string
  }
> = {
  mall: {
    name: '商场',
    blurb: '仙林金鹰、湖南路、新街口……南师门口去哪逛',
    parent: '校园周边生活',
    parentPath: '/around',
    emoji: '🛍️',
    composeHint: '分享一家商场或商业街：位置、怎么去、适合买什么。',
  },
  fun: {
    name: '娱乐地点',
    blurb: '湖边散步、公园、影院、展演，课余去处',
    parent: '校园周边生活',
    parentPath: '/around',
    emoji: '🎡',
    composeHint: '分享一个娱乐去处：适合什么时候去、交通和氛围。',
  },
  food: {
    name: '美食',
    blurb: '和园、湖滨、湖南路……南师人私藏口味',
    parent: '校园周边生活',
    parentPath: '/around',
    emoji: '🍜',
    composeHint: '分享一家店或一条美食街：在哪、吃什么、人均和避坑。',
  },
  courses: {
    name: '选课攻略',
    blurb: '好课、壁垒、给分，都由南师人亲自填写',
    emoji: '📚',
    composeHint: '请填写真实上课体验。课程名、类型必填，不要传播小道消息当事实。',
  },
  campus: {
    name: '校园生活',
    blurb: '宿舍、社团、图书馆、闲置与树洞——校内大小事',
    emoji: '🏫',
    composeHint: '聊聊校内生活：宿舍、社团、讲座、闲置、失物……',
  },
}
