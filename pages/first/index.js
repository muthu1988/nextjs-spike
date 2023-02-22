import Link from "next/link";
import { useRouter } from "next/router";

// fetches data on each request (SS)
// export const getServerSideProps = async () => {
//     return ({ props: { serverSideProps: `Some data fetched on each request ${new Date().toISOString()}` } })
// }

export default function FirstPage(props) {
    const router = useRouter();
    const page = 'FIRST PAGE';
    function onClickRouter(path) {
        router.push(path);
        // router.replace(path, path)
    }
    return (
        <div>
            <div>
                <h1>{page}</h1>
                <b>Link tags</b><br />
                <ul>
                    <li><Link href="/home">HOME</Link></li>
                    <li><Link href="/second">Page - 2</Link></li>
                </ul>
                {/* <b>Buttons using router push</b><br />
                <ul>
                    <li><button onClick={() => onClickRouter('/home')}>Home page button</button></li>
                    <li><button onClick={() => onClickRouter('/second')}>Second page button</button></li>
                </ul> */}
            </div>
            {JSON.stringify(props)}
        </div>
    )
}