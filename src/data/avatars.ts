export type AvatarPreset = {
  id: string
  label: string
  emoji: string
  bg: string
}

export const AVATARS: AvatarPreset[] = [
  { id: 'wisteria', label: '紫藤', emoji: '🌸', bg: '#6B3FA0' },
  { id: 'ginkgo', label: '银杏', emoji: '🍂', bg: '#C9A227' },
  { id: 'pomelo', label: '青柚', emoji: '🍋', bg: '#3F8A5A' },
  { id: 'book', label: '书卷', emoji: '📖', bg: '#4B1E6D' },
  { id: 'library', label: '敬文', emoji: '🏛️', bg: '#3A4A8A' },
  { id: 'cat', label: '校猫', emoji: '🐱', bg: '#8A5A3A' },
  { id: 'music', label: '琴声', emoji: '🎵', bg: '#7A3A6A' },
  { id: 'art', label: '画笔', emoji: '🎨', bg: '#B85A6A' },
  { id: 'ball', label: '球场', emoji: '🏀', bg: '#C45A2A' },
  { id: 'lotus', label: '荷塘', emoji: '🪷', bg: '#2F6F4E' },
  { id: 'star', label: '星空', emoji: '⭐', bg: '#2A1A58' },
  { id: 'tea', label: '随园茶', emoji: '🍵', bg: '#5A7A3A' },
]
