import Header from "./_components/Header";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
                {children}
            </div>
        </section>
    );
}