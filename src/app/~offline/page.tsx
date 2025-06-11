// app/~offline/page.tsx
export default function OfflinePage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 text-gray-800 p-6'>
            <h1 className='text-4xl font-bold mb-4'>You’re Offline</h1>
            <p className='text-lg mb-6'>
                It looks like you don’t have an internet connection. Please
                check your network and try again.
            </p>
            <p className='text-sm text-gray-500'>You & Me Chat App</p>
        </div>
    );
}
// This page will be shown when the user is offline
