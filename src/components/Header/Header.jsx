import LanguageToggle from '../LanguageToggle/LanguageToggle'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <LanguageToggle />
      </div>
    </header>
  )
}

export default Header
