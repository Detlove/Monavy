import { AboutProduct } from '@components/AboutProduct/AboutProduct'
import { ImageCarousel } from '@components/Carousel/Carousel'
import { Navbar } from '@components/Navbar/Navbar'
import { PPageProvider } from '@context/PPContext'

export default (props) => {
  return (
    <PPageProvider {...props}>
      <ProductPage />
    </PPageProvider>
  )
}

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <ImageCarousel />
        <AboutProduct />
      </main>
    </>
  )
}

/* eslint-disable no-undef */
export async function getStaticProps ({ params: { slug } }) {
  const response = await fetch(`http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`)
  const { data } = await response.json()

  return {
    props: {
      data
    }
  }
}

export async function getStaticPaths () {
  const response = await fetch('http://localhost:1337/api/products')
  const { data } = await response.json()

  return {
    paths:
    data.map(item => {
      return {
        params: {
          slug: item.attributes.slug
        }
      }
    }),
    fallback: false
  }
}
