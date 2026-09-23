import {Divider} from "@heroui/react";

export default function NotFound() {
    return <main className={'min-h-screen w-full flex flex-col items-center'} id={'smooth-wrapper'}>
        <div className={'h-screen flex flex-col justify-center items-center'}>
            <h1>404</h1>
            <Divider/>
            <p>Page not found.</p>
        </div>
    </main>
}