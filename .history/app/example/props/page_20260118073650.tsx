"use client"

import { useState } from "react";

export default function Page() {
    return (
        <div>
            <ParentComponent />
        </div>
    );
}


function ParentComponent() {
    const count =1;
    const [number, setNumber] = useState(0)
    const title = "form parent";
    return (
        <div>
            <button onClick={()=> setNumber(number + 1)}>Increment</button>
            <ChildComponent count={count} number={number} />
            <div>Number: {number}</div>
        </div>
    );
}

function ChildComponent({count, number}: {count: number, number: number}) {
    return <div>Count: {count}, Number: {number} </div>;
}
