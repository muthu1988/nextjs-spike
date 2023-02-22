import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const TextSignature = require('../../component/text-signature')

// fetches data on each request (SS)
export const getServerSideProps = async ({ res }) => {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=60'
  // )
  throw new Error();
  return ({ props: { serverSideProps: `Some data fetched on each request ${new Date().toISOString()}` } })
}

const fonts = [
  { name: 'Homemade Apple', url: 'http://fonts.googleapis.com/css?family=Homemade+Apple' },
  { name: 'Dancing Script', url: 'http://fonts.googleapis.com/css?family=Dancing+Script' },
  { name: 'Pacifico', url: 'http://fonts.googleapis.com/css?family=Pacifico' },
  { name: 'Moon Dance', url: 'http://fonts.googleapis.com/css?family=Moon+Dance' },
  { name: 'Satisfy', url: 'http://fonts.googleapis.com/css?family=Satisfy' },
  { name: 'Cookie', url: 'http://fonts.googleapis.com/css?family=Cookie' },
  { name: 'Sacramento', url: 'http://fonts.googleapis.com/css?family=Sacramento' },
  { name: 'Yellowtail', url: 'http://fonts.googleapis.com/css?family=Yellowtail' },
  // { name: 'Parisienne', url: 'http://fonts.googleapis.com/css?family=Parisienne' },
  // { name: 'Alura', url: 'http://fonts.googleapis.com/css?family=Alura' },
  { name: 'La Belle Aurore', url: 'http://fonts.googleapis.com/css?family=La+Belle+Aurore' },
  { name: 'Mr Dafoe', url: 'http://fonts.googleapis.com/css?family=Mr+Dafoe' },
  { name: 'Nanum Pen Script', url: 'http://fonts.googleapis.com/css?family=Nanum+Pen+Script' },
]

export default function Home(props) {

  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState('');
  let textSignature = null;

  const router = useRouter();
  function onClickRouter(path) {
    router.push(path);
  }

  useEffect(() => {
    // router.prefetch('/first');
    // router.prefetch('/second');
  }, []);

  function getSignature(inputText = text, font = selectedFont) {
    var optionsParameter = {
      width: 500,
      height: 200,
      paddingX: 50,
      paddingY: 50,
      canvasTargetDom: ".js-canvasTargetDom",
      font: ["30px", `'${font.name}'`],
      color: "blue",
      textString: inputText,
      customFont: font
    };
    // if (!textSignature)
    const textSignature = new TextSignature(optionsParameter);
    // else
    //   textSignature.generateImage(optionsParameter);
    const img = textSignature.getImageData();
    setImageData(textSignature.imageData);
    setText(inputText)
    console.log(textSignature)
  }

  function setFont(font) {
    const selectedFont = JSON.parse(font.currentTarget.value);
    setSelectedFont(selectedFont)
    getSignature(text, selectedFont);
  }

  return (
    <div>
      <div>
        <h1>{'HOME'}</h1>
        <input onChange={(e) => getSignature(e.target.value)} />
        <select onChange={setFont}>
          {fonts.map((f) => {
            return <option key={f.name} value={JSON.stringify(f)}>{f.name}</option>
          })}
        </select><br />
        <div className="js-canvasTargetDom" />
        <b>Link tags</b><br />
        <ul>
          <li><Link href="/first">Page - 1 </Link></li>
          <li><Link href="/second">Page - 2</Link></li>
        </ul>
        {/* <b>Buttons using router push</b><br />
        <ul>
          <li><button onClick={() => onClickRouter('/first')}>First page button</button></li>
          <li><button onClick={() => onClickRouter('/second')}>Second page button</button></li>
        </ul> */}
      </div>
      {JSON.stringify(props)}<br />
      {/* {new Date().toISOString()} */}
    </div>
  )
}