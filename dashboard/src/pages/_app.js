// scroll bar
import 'simplebar/src/simplebar.css'

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

import PropTypes from 'prop-types'
import cookie from 'cookie'
// next
import Head from 'next/head'
import App from 'next/app'
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
// utils
import { getSettings } from '../utils/getSettings'
// contexts
import { SettingsProvider } from '../contexts/SettingsContext'
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext'
// theme
import ThemeProvider from '../theme'
// components
import ThemeSettings from '../components/settings'
import ProgressBar from '../components/ProgressBar'
import MotionLazyContainer from '../components/animate/MotionLazyContainer'

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object
}

export default function MyApp (props) {
  const { Component, pageProps, settings } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CollapseDrawerProvider>
          <SettingsProvider defaultSettings={settings}>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ProgressBar />
                  {getLayout(<Component {...pageProps} />)}
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </CollapseDrawerProvider>
      </LocalizationProvider>
    </>
  )
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie)

  const settings = getSettings(cookies)

  return {
    ...appProps,
    settings
  }
}
