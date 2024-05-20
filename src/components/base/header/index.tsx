import NavLink from './components/nav-link'

function Header() {
  return (
    <header className="flex items-center justify-between">
      <span>Timer Logo</span>

      <nav className="flex gap-2">
        <NavLink href="/" iconName="Timer" />

        <NavLink href="/history" iconName="FileClock" />
      </nav>
    </header>
  )
}

export default Header
