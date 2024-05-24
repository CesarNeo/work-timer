import NavLink from './components/nav-link'

function Header() {
  const currentDay = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="flex items-center justify-between">
      <span className="uppercase">{currentDay}</span>

      <nav className="flex gap-2">
        <NavLink href="/" iconName="Timer" />

        <NavLink href="/history" iconName="FileClock" />
      </nav>
    </header>
  )
}

export default Header
