import Head from 'next/head'
import Header from './Header'
import './layout.css';
   
const Layout = (props) => (
  <div id="page">
    <Head>
      <link href="https://fonts.googleapis.com/css?family=K2D|Roboto" rel="stylesheet" />
    </Head>
    {props.children}
  </div>
)

export default Layout