import { Container, Typography } from '@mui/material'
// layouts
import Layout from '../layouts'
// hooks
import useSettings from '../hooks/useSettings'
// components
import Page from '../components/Page'

// ----------------------------------------------------------------------

PageOne.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function PageOne () {
  const { themeStretch } = useSettings()

  return (
    <Page title='Inicio'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography textAlign='center' paragraph>
          En construcción
        </Typography>

      </Container>
    </Page>
  )
}
