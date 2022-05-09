import { usePPage } from '@context/PPContext'
/* import VisibilitySensor from 'react-visibility-sensor' */
import { SBox } from '@components/SVG/SBox'
import { SC5Stars } from '@components/SVG/SC5Stars'
import { SShip } from '@components/SVG/SShip'
/* import { ShipDate } from '@components/ShipDate/ShipDate' */
import Link from 'next/link'

import styles from './aboutproduct.module.css'

export const AboutProduct = () => {
  const {
    /* sethideSticky, hdlPayBtn, toMoney, priceObj, pPageState, changePPState, setPpImg, */
    pData: { title }
  } = usePPage()

  const changePQ = (o) => {
    o === 0 && pPageState.units > 1 && changePPState('units', pPageState.units - 1)
    o === 1 && changePPState('units', pPageState.units + 1)
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.reviews}>
        <SC5Stars className={styles.sc5stars} />
        <span>127 Reviews</span>
      </div>
      {/* <p className={styles.price}>
        <s>{toMoney(price)}</s>
        {toMoney(priceObj.itemPrice)}
      </p>
      <div className={styles.size}>
        <div className={styles.size_top}>
          <span className={styles.size_title}>Talla:</span>
          <span className={styles.size_desc}>
            {variants[pPageState.variant].letter} . {variants[pPageState.variant].desc}
          </span>
        </div>
        <div className={styles.size_options}>

          {variants.map((size, i) =>
            <div
              className={`${styles.size_option} ${
                pPageState.variant === i ? styles.is_selected : ''
              }`}
              key={i}
              onClick={() => { changePPState('variant', i) }}
            >
              {size.letter}
            </div>
          )}
          <Link
            href={{
              pathname: 'guantes',
              query: { slug: 'my-post' }
            }}
          >
            <span
              className={styles.size_qt}
            >
              ¿No sabes tu talla?
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.quantify}>
        Cantidad
        <div className={styles.quantify_buttons}>
          <span
            onClick={() => { changePQ(0) }}
          > -
          </span>
          {pPageState.units}
          <span
            onClick={() => { changePQ(1) }}
          > +
          </span>
        </div>
      </div>
      <VisibilitySensor onChange={sethideSticky}>
        <button
          className={styles.buy_button}
          onClick={hdlPayBtn}
          id='btn1'
        >PIDE AQUÍ Y PAGA EN CASA
        </button>
      </VisibilitySensor>
      <div className={styles.ship}>
        <div className={styles.ship_item}>
          <SShip className={styles.sship} />
          <span><strong>Llegada Estimada: </strong>
            <ShipDate mn={1.5} mx={5} />
          </span>
        </div>
        <div className={styles.ship_item}>
          <SBox />
          <span> <strong>Envíos Gratis: </strong>En todas las órdenes a nivel nacional</span>
        </div>
      </div> */}
    </section>
  )
}
