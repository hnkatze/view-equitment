import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Equipment } from "@/type/type"
import { useEffect, useState } from "react"
import { fireCrude } from "@/config/crude.fire"



export function EquipmentCard({ id }: { id: string }) {
    const [equipment, setEquipment] = useState<Equipment | null>(null)

    useEffect(() => {
        const fetchEquipment = async () => {
            const response = await fireCrude.getItemsById(id);
            setEquipment(response as Equipment);
        }
        fetchEquipment();
    }, [id])

  return (
    <>
      {equipment ? (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              {equipment.brand} {equipment.model}
            </CardTitle>
            <CardDescription>
              Type: {equipment.type} | UID: {equipment.uid}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Especificacion</h3>
                <p>RAM: {equipment.ram}</p>
                <p>Hard Disk: {equipment.hardDisk}</p>
                <p>IP: {equipment.ip}</p>
                <p>Serie: {equipment.serie}</p>
              </div>
              <div>
                <h3 className="font-semibold">Asignacion</h3>
                <p>Departamento: {equipment.department}</p>
                <p>Asignado: {equipment.userAssigned}</p>
                <p>Supervisor: {equipment.officer}</p>
                <p>Ubicacion: {equipment.ubication}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Observaciones</h3>
              <p>{equipment.observations}</p>
            </div>
            {equipment.photosURL && equipment.photosURL.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Fotos</h3>
                <div className="flex space-x-2">
                  {equipment.photosURL.map((url, index) => (
                    <Image
                      key={index}
                      src={url || "/placeholder.svg"}
                      alt={`Equipment photo ${index + 1}`}
                      width={200}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge variant={equipment.active ? "default" : "destructive"}>{equipment.active ? "Active" : "Inactive"}</Badge>
          </CardFooter>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

