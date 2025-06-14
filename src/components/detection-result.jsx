"use client";
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, AlertTriangle } from 'lucide-react'

export function DetectionResult({
  imageUrl,
  isHealthy,
  disease,
  treatment
}) {
  return (
    (<Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Hasil Deteksi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Gambar"
            layout="fill"
            objectFit="cover" />
        </div>
        <div className="flex items-center justify-center">
          {isHealthy ? (
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300 flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Tanaman Sehat
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 border-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Tanaman Sakit
            </Badge>
          )}
        </div>
        {!isHealthy && disease ? (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-red-800">Penyakit Terdeteksi:</h3>
            <p className="text-red-700 font-medium">{disease}</p>
          </div>
        ) : (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800">Tidak Ada Penyakit Terdeteksi</h3>
          </div>
        )}
        {treatment && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Saran Perawatan:</h3>
            {treatment.map((element, index) => <p className="text-blue-700" key={index}>{index+1+". "+element}</p> )}
          </div>
        )}
      </CardContent>
    </Card>)
  );
}

