import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { BoardId, Campus, Comment, Post } from '../types'
import { loadComments, loadPosts, saveComments, savePosts, uid } from '../lib/storage'

type NewPost = Omit<Post, 'id' | 'createdAt' | 'likes'>

type ForumContextValue = {
  posts: Post[]
  comments: Comment[]
  postsByBoard: (boardId: BoardId, campus: Campus) => Post[]
  postsByCampus: (campus: Campus) => Post[]
  getPost: (id: string) => Post | undefined
  commentsOf: (postId: string) => Comment[]
  addPost: (input: NewPost) => Post
  addComment: (postId: string, authorId: string, content: string) => void
  toggleLike: (postId: string, userId: string) => void
}

const ForumContext = createContext<ForumContextValue | null>(null)

function sortPosts(posts: Post[]) {
  return [...posts].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function ForumProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => loadPosts())
  const [comments, setComments] = useState<Comment[]>(() => loadComments())

  const value = useMemo<ForumContextValue>(
    () => ({
      posts,
      comments,
      postsByBoard: (boardId, campus) =>
        sortPosts(posts.filter((p) => p.boardId === boardId && p.campus === campus)),
      postsByCampus: (campus) => posts.filter((p) => p.campus === campus),
      getPost: (id) => posts.find((p) => p.id === id),
      commentsOf: (postId) =>
        comments
          .filter((c) => c.postId === postId)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      addPost: (input) => {
        const post: Post = {
          ...input,
          id: uid(),
          createdAt: new Date().toISOString(),
          likes: [],
        }
        const next = [post, ...posts]
        setPosts(next)
        savePosts(next)
        return post
      },
      addComment: (postId, authorId, content) => {
        const comment: Comment = {
          id: uid(),
          postId,
          authorId,
          content: content.trim(),
          createdAt: new Date().toISOString(),
        }
        const next = [...comments, comment]
        setComments(next)
        saveComments(next)
      },
      toggleLike: (postId, userId) => {
        const next = posts.map((p) => {
          if (p.id !== postId) return p
          const liked = p.likes.includes(userId)
          return {
            ...p,
            likes: liked ? p.likes.filter((id) => id !== userId) : [...p.likes, userId],
          }
        })
        setPosts(next)
        savePosts(next)
      },
    }),
    [posts, comments],
  )

  return <ForumContext.Provider value={value}>{children}</ForumContext.Provider>
}

export function useForum() {
  const ctx = useContext(ForumContext)
  if (!ctx) throw new Error('useForum 必须在 ForumProvider 内使用')
  return ctx
}
