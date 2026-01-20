export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            App Logo
            {children}

            Footer @2025
        </section>
    );
}