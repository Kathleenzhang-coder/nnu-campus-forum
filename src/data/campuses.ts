import type { Campus } from '../types'

export type CampusMeta = {
  id: Campus
  short: string
  name: string
  motto: string
  hero: string
  style: string
  photo: string
  aroundLead: string
  around: {
    mall: { desc: string }
    fun: { desc: string }
    food: { desc: string }
  }
}

export const CAMPUSES: CampusMeta[] = [
  {
    id: '仙林',
    short: '仙林',
    name: '仙林校区',
    motto: '银门金字 · 敬文与仙林湖',
    hero: '仙林校区开阔现代。周边、选课和校园生活，只显示本区同学写下的内容。',
    style: '现代开阔',
    photo: '/campus/xianlin-gate.png',
    aroundLead: '走出仙林校门：金鹰湖滨、和园、仙林湖。先选小类再看帖。',
    around: {
      mall: { desc: '金鹰湖滨天地、南大和园商业街。仙林同学周末逛街的第一站。' },
      fun: { desc: '仙林湖、羊山公园、湖滨影院。下课吹风、跑步、看一场电影。' },
      food: { desc: '南大和园与湖滨一带。食堂之外的口味，由吃过的人来写。' },
    },
  },
  {
    id: '随园',
    short: '随园',
    name: '随园校区',
    motto: '黄墙朱柱 · 紫藤与银杏',
    hero: '随园校区一脉古典。周边、选课和校园生活，只显示本区同学写下的内容。',
    style: '古典园林',
    photo: '/campus/suiyuan-hall.png',
    aroundLead: '走出随园校门：湖南路、新街口、玄武湖。先选小类再看帖。',
    around: {
      mall: { desc: '湖南路步行街、新街口商圈。随园出门就能接到城市里的店。' },
      fun: { desc: '玄武湖、清凉山。不想逛街时，把脑子放到湖边去。' },
      food: { desc: '湖南路、狮子桥一带。店密、选择杂，欢迎写下人均和必点。' },
    },
  },
  {
    id: '紫金',
    short: '紫金',
    name: '紫金校区',
    motto: '钟山脚下 · 板仓书声',
    hero: '紫金校区临近钟山。周边、选课和校园生活，只显示本区同学写下的内容。',
    style: '钟山书院',
    photo: '',
    aroundLead: '走出紫金校门：孝陵卫、卫岗、钟山风景区。先选小类再看帖。',
    around: {
      mall: { desc: '孝陵卫、马群一带。日用补给和周末逛街可以写在这里。' },
      fun: { desc: '中山陵、美龄宫、钟山。紫金同学课余最近的风景。' },
      food: { desc: '卫岗、孝陵卫小吃。欢迎把常去的店和避雷留给后来者。' },
    },
  },
]

export const DEFAULT_CAMPUS: Campus = '仙林'

export function campusMeta(id: Campus): CampusMeta {
  return CAMPUSES.find((c) => c.id === id) ?? CAMPUSES[0]
}
