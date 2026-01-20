"use client"

export default function Page() {
    return (
        <div></div>
    );
}

function ParentComponent() {
    const count =1;
    return(<ChildComponent count={count} />);
}

function ChildComponent({count}: {count: number}) {
    return <div>Count: {count}</div>;
}
