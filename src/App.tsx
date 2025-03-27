import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { Layout } from "./layout";
import { AgeGroupsPage } from "./pages/AgeGroupsPage";
import { Url } from "./types/enums";
import QuestionsPage from "./pages/QuestionsPage/QuestionsPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { InfantsNeedCarePage } from "./pages/InfantsNeedCarePage";
import { UserPage } from "./pages/Userpage";
import { HomePage } from "./pages/HomePage";
import { MoreInfoPage } from "./pages/MoreInfoPage";

function App() {

  // const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={
            <Layout>
              <HomePage/>
            </Layout>} 
          />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Url.ageGroups} element={
            <Layout>
              <AgeGroupsPage/>
            </Layout>} 
          />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Url.questions} element={
            <Layout>
              <QuestionsPage/>
            </Layout>} 
          />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Url.categories} element={
            <Layout>
              <CategoriesPage/>
            </Layout>} 
          />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Url.infantsNeedCare} element={
            <Layout>
              <InfantsNeedCarePage />
            </Layout>} 
          />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Url.users} element={
            <Layout>
              <UserPage />
            </Layout>} 
          />
        </Route> 
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={'/more-info'} element={
            <Layout>
              <MoreInfoPage />
            </Layout>} 
          />
        </Route> 
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
