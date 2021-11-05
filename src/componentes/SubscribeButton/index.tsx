import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import {getStripeJs} from '../../services/stripe-js'
import { useRouter } from 'next/router';
interface SubscribeButtonProps{
  priceId:string,
}
export function SubscribeButton ({priceId}:SubscribeButtonProps){
  const [session] = useSession();
  const router =useRouter()
 async function handleSubscribe(){
    if(!session){
      signIn('github')
      return
    }
    if(session.activeSubscription)
    {
      router.push('/posts')
      return
    }
    //criação da chekout useSession
    try {
      const response = await api.post('/subscribe')
      const sessionId = response.data;
      console.log(sessionId)
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({sessionId:sessionId.session})
    } catch (error) {
      alert(error.message)
    }
  }
  
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
      >        
    Subscribe now
    </button>
  );
}