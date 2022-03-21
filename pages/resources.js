import Airtable from 'airtable';
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const airtable = new Airtable({
    apiKey: process.env.API_KEY,
    view: 'Name',
  });

  const records = await airtable
    .base(process.env.BASE_ID)('Resources')
    .select({
      fields: ['Name', 'Link', 'Status', 'Category', 'About', 'Image'],
      view: 'Name',
    })
    .all();

  const products = records.map((sig) => {

    return {
      name: sig.get('Name'),
      type: sig.get('Name'),
      category: sig.get('Category'),
      link: sig.get('Link'),
      status: sig.get('Status'),
      about: sig.get('About'),
      image: sig.get('Image'),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}


function Product({ name, type, about, heads, image, status, category, link }) {
    function Colours() {
        if(status == 'Open') {
            return '#08b445'
        }
        if (status == 'Soon') {
            return '#c89809'
        }
        if (status == 'Closed') {
            return 'red'
        }
    }

    return (
    <div className="max-w-sm rounded-lg border m-3 shadow-md bg-gray-300 border-gray-300">
    <div className="p-5">
        <a href="#"
        style={{
          display: 'flex',
        }}
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{name}</h5>
<div>

 <button className="px-2 mx-2 py-0 -translate-y-0.5 my-2 opacity-0.8 hover:bg-yellow-600 text-white text-sm font-medium rounded-full" 
    style={{
        backgroundColor: Colours(),
    }}
 >
    {status}
 </button>
 </div>
        </a>

        <p className="mb-3 font-normal text-gray-700"><i>{category}</i></p>
        <p className="mb-3 font-normal text-gray-700">{about}</p>
        <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-900 hover:bg-blue-800 focus:ring-blue-800">
            Explore
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
    </div>
</div>
  );
}

export default function Resources({ products }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Turner Fenton Secondary School</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        

        <div className={styles.grid}>

        {products.map((sig) => (
          <Product
            key={sig.name}
            name={sig.name}
            type={sig.name}
            category={sig.category}
            link={sig.link}
            heads={sig.heads}
            status={sig.status}
            about={sig.about}
            colour={sig.colour}
            image={sig.image}
          />    
        ))}
        </div>

        
      </main>
    </div>
  )
}
