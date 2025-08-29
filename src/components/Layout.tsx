import { Outlet, Link, useMatches } from 'react-router-dom'
import { Breadcrumb, Container } from 'semantic-ui-react'

const Layout = () => {
  const matches = useMatches()
  const breadcrumbs = matches
    .filter(match => match.handle && (match.handle as any).crumb)
    .map(match => ({
      crumb: typeof (match.handle as any).crumb === 'function'
        ? (match.handle as any).crumb(match.data)
        : (match.handle as any).crumb,
      pathname: match.pathname || ''
    }))

  return (
    <Container style={{ marginTop: '1em' }}>
      <Breadcrumb>
        {breadcrumbs.map((bc, index) => (
          <span key={bc.pathname}>
            <Breadcrumb.Section
              as={Link}
              to={bc.pathname}
              active={index === breadcrumbs.length - 1}
            >
              {bc.crumb}
            </Breadcrumb.Section>
            {index < breadcrumbs.length - 1 && <Breadcrumb.Divider icon='right angle' />}
          </span>
        ))}
      </Breadcrumb>
      <Outlet />
    </Container>
  )
}

export default Layout
