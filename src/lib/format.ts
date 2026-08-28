export function timeAgo(iso: string) {
  const delta = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(delta / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} 天前`
  return new Date(iso).toLocaleDateString('zh-CN')
}

export function yearLabel(year: number) {
  if (year <= 1902) return '站务'
  return `${year} 级`
}

export function currentEnrollYears() {
  const latest = new Date().getFullYear()
  const years: number[] = []
  for (let y = latest; y >= latest - 10; y -= 1) years.push(y)
  return years
}
