import Image from 'next/image'
import { usePPage } from '@context/PPContext'
import Carousel from 'nuka-carousel'

import styles from './carousel.module.css'

export const ImageCarousel = () => {
  const { pData: { images } } = usePPage()

  return (
    <section
      className={styles.section}
    >
      <Carousel
        wrapAround
        autoplay
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
      >
        {
          images.data.map(({ attributes }, i) =>
            <div className={styles.cont} key={i}>
              <div className={styles.image}>
                <Image
                  src={process.env.NEXT_PUBLIC_BACK_URL + attributes.url}
                  priority={i === 0}
                  layout='fill'
                  objectFit='cover'
                  sizes='(max-width: 500px) 250px, 400px'
                />
              </div>
            </div>
          )
        }
      </Carousel>
    </section>
  )
}
