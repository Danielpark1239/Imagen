import { type NextPage } from "next"
import Head from "next/head"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

const Cookies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imagen</title>
      </Head>
      <main>
        <Navbar />
        <div className="mt-32 flex flex-col gap-4 px-16 text-black mb-40">
          <h1 className="text-3xl font-semibold">Cookie Policy</h1>
          <p>
            Cookies are small text files that are stored on your device when you
            visit a website. We use cookies to provide a better user experience,
            analyze how users interact with our website, and to personalize
            content and ads.
          </p>
          <p>
            Below you can manage your cookie preferences. Please note that by
            disabling certain cookies, you may limit your ability to use certain
            features of our website.
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Cookies we use</h2>
          <p>
            We use cookies to provide a better experience on our website and to
            understand how visitors interact with our content. Here are the
            cookies we use:
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Stripe (required)</h3>
          <p>
            We use stripe as our payment gateway which allows websites to
            process online payments securely and easily. When a user makes a
            payment on your website using Stripe, their payment information
            (such as their credit card details) needs to be stored temporarily
            while the payment is being processed. Please review the{" "}
            <a className="link" href="https://stripe.com/cookie-settings">
              https://stripe.com/cookie-settings
            </a>{" "}
            settings to configure your stripe cookies.
          </p>
          <p>
            To enable this, Stripe uses cookies to store information about the
            user's session, such as their session ID and the status of their
            payment. These cookies are necessary for the payment process to work
            properly, and they are stored on the user's browser until the
            payment process is complete.
          </p>
          <p>
            In addition to payment-related cookies, Stripe may also use other
            cookies on your website to improve performance, analyze how users
            interact with the website, and provide relevant advertising.
            However, these additional cookies are optional and you can choose to
            disable them if you prefer. Stripe's use of cookies is subject to
            their own privacy policy, which you should review if you have any
            specific concerns.
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Authentication (required)
          </h3>
          <p>
            We use Clerk to authenticate users on our application. Clerk is a
            service which allows users to authenticate using various third party
            services, such as Google, which makes it easy to sign up and start
            using our application.
          </p>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Cookies
