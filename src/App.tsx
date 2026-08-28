import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RedirectIfAuthed, RedirectIfProfileReady, RequireAuth, RequireProfile } from './components/Guards'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { CampusProvider } from './context/CampusContext'
import { ForumProvider } from './context/ForumContext'
import { AroundHubPage } from './pages/AroundHubPage'
import { BoardPage } from './pages/BoardPage'
import { ComposePage } from './pages/ComposePage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PostPage } from './pages/PostPage'
import { ProfilePage } from './pages/ProfilePage'
import { SetupPage } from './pages/SetupPage'

export default function App() {
  return (
    <AuthProvider>
      <CampusProvider>
        <ForumProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <RedirectIfAuthed>
                    <LoginPage />
                  </RedirectIfAuthed>
                }
              />
              <Route
                path="/setup"
                element={
                  <RequireAuth>
                    <RedirectIfProfileReady>
                      <SetupPage />
                    </RedirectIfProfileReady>
                  </RequireAuth>
                }
              />
              <Route
                element={
                  <RequireAuth>
                    <RequireProfile>
                      <Layout />
                    </RequireProfile>
                  </RequireAuth>
                }
              >
                <Route path="/" element={<HomePage />} />
                <Route path="/around" element={<AroundHubPage />} />
                <Route path="/board/:boardId" element={<BoardPage />} />
                <Route path="/board/:boardId/new" element={<ComposePage />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ForumProvider>
      </CampusProvider>
    </AuthProvider>
  )
}
