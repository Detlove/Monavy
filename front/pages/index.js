import { useEffect } from 'react'

const Index = ({ data }) => {
  console.log(data)
  return (
    <div>
      Hola
    </div>
  )
}

export async function getStaticProps () {
  const response = await fetch('http://localhost:1337/api/products')
  const { data } = await response.json()

  return {
    props: {
      data
    } // will be passed to the page component as props
  }
}

export default Index
