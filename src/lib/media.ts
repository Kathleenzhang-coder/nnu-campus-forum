export async function fileToImageSrc(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const max = 1280
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法处理图片')
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.72)
}

export function fileToVideoSrc(file: File): Promise<string> {
  if (file.size > 4 * 1024 * 1024) {
    throw new Error('视频请小于 4MB，或改用视频链接。')
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('视频读取失败'))
    reader.readAsDataURL(file)
  })
}

export function isDirectVideo(src: string) {
  return src.startsWith('data:video') || /\.(mp4|webm|ogg)($|\?)/i.test(src)
}
