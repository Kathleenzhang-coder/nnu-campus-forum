import { AVATARS } from '../data/avatars'

type Props = {
  avatar: string
  size?: number
  alt?: string
}

export function Avatar({ avatar, size = 40, alt = '头像' }: Props) {
  const preset = AVATARS.find((a) => a.id === avatar)
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.45,
  }

  if (avatar.startsWith('data:')) {
    return <img className="avatar-img" src={avatar} alt={alt} style={style} />
  }

  return (
    <span
      className="avatar-preset"
      style={{ ...style, background: preset?.bg ?? '#6B3FA0' }}
      aria-label={alt}
    >
      {preset?.emoji ?? '🌸'}
    </span>
  )
}
