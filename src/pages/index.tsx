/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import Head from 'next/head';
import {SubscribeButton} from '../componentes/SubscribeButton';
import { stripe } from '../services/stripe';
import styleHome from './home.module.scss';

interface HomeProps{
  product:{
    priceId: string,
    amount:number
  }
}
export default function Home({product}:HomeProps) {
 
  return (
    <>
    <Head>
        <title>Inicio do bsvnews</title>
    </Head>
        <main className={styleHome.contentContainer}>
          <section className={styleHome.hero}>
            <span>👏Ola, bem vindo as</span>
            <h1>Novidades sobre o mundo do <span>React</span></h1>
            <p>
              Garanta acesso a todo o conteudo por apenas<br />
              <span>{product.amount} ao mês</span>
            </p>
          <SubscribeButton priceId={product.priceId}/> 
          </section>
          <img src="/image/avatar.svg" alt="garota codando" /> 
        </main>      
    </>
  )
}
export const getStaticProps:GetStaticProps = async() =>{
  const price = await stripe.prices.retrieve("price_1JhNqvLfO0Wz1vUBmDbvWorp")
  const product = {
    priceID:price.id,
    amount: new Intl.NumberFormat('pt-BR',
     {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price.unit_amount / 100)
  }
  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24, //24h 
  }
}
