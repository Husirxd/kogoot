"use client"
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const  s = searchParams.get("s");

    return(
        <div className="page container">
        <h1>Score: {s}</h1>
        </div>
    )
}

export default Page;