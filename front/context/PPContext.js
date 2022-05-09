import { createContext, useContext, useState } from 'react'

const PPageContext = createContext()

export const PPageProvider = (props) => {
  const { attributes: pData } = props.data[0]
  console.log(pData)

  /* const [hideSticky, sethideSticky] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [ppImg, setPpImg] = useState(false) */

  const [pPageState, setPPageState] = useState({
    units: 1,
    variant: 0
  })

  /* const { price, discounts } = productData

  const dscPnt = pPageState.units === 1
    ? discounts[0]
    : pPageState.units === 2
      ? discounts[1]
      : discounts[2]
  const dscFixed = ((price * dscPnt) / 100).toFixed(0) * 100
  const itemPrice = price - dscFixed
  const finalPrice = itemPrice * pPageState.units
  const priceObj = { dscPnt, dscFixed, itemPrice, finalPrice } */

  /* const hdlPayBtn = () => {
    setShowPopup(true)
  } */

  /* const changePPState = (k, v) => {
    setPPageState({
      ...pPageState,
      [k]: v
    })
  } */

  /* Helpers */
  const toMoney = (n) => `$${n.toLocaleString('en-US')}`

  const value = {
    pData
    /* productData, */
    // pPageState,
    // setPPageState,
    // hideSticky,
    // sethideSticky,
    // showPopup,
    // setShowPopup,
    // /* priceObj, */
    // toMoney,
    // changePPState,
    // hdlPayBtn,
    // ppImg,
    // setPpImg
  }
  return <PPageContext.Provider value={value} {...props} />
}

export const usePPage = () => {
  const context = useContext(PPageContext)
  if (!context) {
    console.log('error context')
  }
  return context
}
