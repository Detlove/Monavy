import { useState, useEffect } from 'react'
import { SBag } from '@components/SVG/SBag'
import { SMenu } from '@components/SVG/SMenu'
import Image from 'next/image'

import styles from './navbar.module.css'

export const Navbar = () => {
  const [hideNav, sethideNav] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scy = window.scrollY

      scy > 150 && sethideNav(true)
      scy < 150 && sethideNav(false)
    })
  }, [])

  return (
    <nav className={`${styles.nav} ${hideNav ? styles.hide : ''}`}>
      <SMenu className={styles.smenu} />
      <div className={styles.logo}>
        <Image
          priority
          src='/assets/logo.png'
          layout='fill'
          objectFit='contain'
          sizes='100px'
        />
      </div>
      <SBag className={styles.sbag} />
    </nav>
  )
}
