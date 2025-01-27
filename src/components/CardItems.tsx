import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Equipment } from "@/type/type";
import { useEffect, useState } from "react";
import { fireCrude } from "@/config/crude.fire";

import Zoom from "react-medium-image-zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import Slider from "react-slick";

export function EquipmentCard({ id }: { id: string }) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const response = await fireCrude.getItemsById(id);
      setEquipment(response as Equipment);
    };
    fetchEquipment();
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <>
      {equipment ? (
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="text-2xl md:text-3xl">
              {equipment.brand} {equipment.model}
            </CardTitle>
            <CardDescription className="text-gray-200">
              Type: {equipment.type} | UID: {equipment.uid}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Especificacion
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>
                    <span className="font-medium">RAM:</span> {equipment.ram}
                  </p>
                  <p>
                    <span className="font-medium">Hard Disk:</span>{" "}
                    {equipment.hardDisk}
                  </p>
                  <p>
                    <span className="font-medium">IP:</span> {equipment.ip}
                  </p>
                  <p>
                    <span className="font-medium">Serie:</span>{" "}
                    {equipment.serie}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Asignacion
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Departamento:</span>{" "}
                    {equipment.department}
                  </p>
                  <p>
                    <span className="font-medium">Asignado:</span>{" "}
                    {equipment.userAssigned}
                  </p>
                  <p>
                    <span className="font-medium">Supervisor:</span>{" "}
                    {equipment.officer}
                  </p>
                  <p>
                    <span className="font-medium">Ubicacion:</span>{" "}
                    {equipment.ubication}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Observaciones
              </h3>
              <p className="bg-gray-100 p-4 rounded-lg">
                {equipment.observations}
              </p>
            </div>
            {equipment.photosURL && equipment.photosURL.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Fotos
                </h3>
                <Slider {...sliderSettings}>
                  {equipment.photosURL.map((url, index) => (
                    <div key={index} className="px-2">
                      <Zoom>
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Equipment photo ${index + 1}`}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover w-full h-[300px]"
                        />
                      </Zoom>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-gray-50 p-4">
            <Badge
              variant={equipment.active ? "default" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {equipment.active ? "Active" : "Inactive"}
            </Badge>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
}
