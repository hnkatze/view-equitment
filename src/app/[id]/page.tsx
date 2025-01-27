"use client";

import { EquipmentCard } from "@/components/CardItems";
import { useParams } from "next/navigation";



export default function Page(){
    const params = useParams<{ id: string }>();

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Equipment Inventory</h1>
        <EquipmentCard id={params.id} />
      </div>
    );
}


