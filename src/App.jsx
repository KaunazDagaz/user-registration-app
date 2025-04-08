import Header from "./components/Header/Header"
import ImagePage from "./components/ImagePage/ImagePage"
import UserList from "./components/UserList/UserList"
import UserRegister from "./components/UserRegister/UserRegister"

function App() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <div className="mb-[140px] mx-auto max-w-[1170px]">
          <ImagePage />
        </div>
        <div className="px-4 md:px-8 lg:px-15 xl:px-0 pb-[140px] mx-auto max-w-[1170px]">
          <UserList />
        </div>
        <div className="px-4 pd:mx-8 lg:px-15 xl:px-0 pb-[100px] mx-auto max-w-[1170px]">
          <UserRegister />
        </div>
      </main>
    </>
  )
}

export default App