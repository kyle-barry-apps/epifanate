import Navigation from "./Navigation"
import ProfileSection from "./ProfileSection"

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Navigation />
      <main className="main-container">{children}</main>
      {true && <ProfileSection />}
    </div>
  )
}

export default Layout