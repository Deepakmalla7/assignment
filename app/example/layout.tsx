export default function ExampleLayout(
    {children}: {children: React.ReactNode}) {
    return (
        <section>
            <div>Example Layout Header</div>
            {children}
         <div>Example Layout Footer</div>

        </section>
    );
} 