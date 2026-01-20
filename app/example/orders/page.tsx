"use client"

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { orderStatus } from "./actions/orderStatus";

export default function Page() {
    const router = useRouter();

    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [isPending, startTransition] = useTransition();
    const[isPendingNext,setIsPendingNext] = useTransition();

    const handleApplysubmit = () => {
        //use orderStatus with transition
        
startTransition(async () => {
      if(!price){
                alert("Price is required");
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
          
            const amount = parseFloat(price);        

            if (amount < 0) {
                router.push("/example/orders/failure");
            } else {
                router.push("/example/orders/success");
            }
    });
    };

    const handleNextSubmit =()=>{
         if(!status){
                alert("Status is required");
                return;
            }
          setIsPendingNext(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            const response = await orderStatus(status);
            if (response?.error) {
                alert(`Order processing failed: ${response.error}`);
                return;
            }

                    });

        
    }

    return (
        <div>
            <label>Status</label>
            <input
                className="ml-5 border-2 h-10"
                placeholder="e.g. pending"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />

            <label className="ml-4">Price</label>
            <input
                className="ml-5 border-2 h-10"
                type="number"
                placeholder="e.g. 100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button
                onClick={handleApplysubmit}
                disabled={isPending}
                className="m-4 w-full rounded-md bg-green-500 px-3 py-2 text-black hover:bg-green-600"
            >
                {isPending ? "Applying..." : "Apply"}
            </button>

            <button
                onClick={handleNextSubmit}
                disabled={isPendingNext}

                className="m-4 w-full rounded-md bg-red-500 px-3 py-2 text-black hover:bg-red-600"
            >
            {isPendingNext ? "Processing..." : "Next"}
            </button>
        </div>
    );
}
