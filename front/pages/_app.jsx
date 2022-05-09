import { AppProvider } from '@context/AppContext'
import { LazyMotion, domAnimation } from 'framer-motion'
/* import { Analytics } from '@components/Analytics/Analytics' */

import '@styles/reset.css'
import '@styles/globals.css'

export default (props) => {
  return (
    <AppProvider>
      <MyApp {...props} />
    </AppProvider>
  )
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <LazyMotion features={domAnimation}>
      {/* <Analytics /> */}
      <Component {...pageProps} />
    </LazyMotion>
  )
}
