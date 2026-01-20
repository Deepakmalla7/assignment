export default function UserLayout(
    {children}: {children: React.ReactNode}) {
    return (
        <section>
            <div>User Layout Header</div>
            {children}
            <div>User Layout Footer</div>
        </section>
    );
}