"use client"

import { title } from "process";
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
            <ChildComponent count={count} number={number} title={String} />
            <div>Number: {number}</div>
        </div>
    );
}



function ChildComponent({count, number, title}: {count: number, number: number, title: number}) {
    return (
        <div>{count}, {number}
            <GrandChildComponent title={title} />

        </div>
    )

    
    
}
interface GrandChildProps {
    title: string;
}

function GrandChildComponent({title}: GrandChildProps) {
    return <div>{title}</div>;
}

