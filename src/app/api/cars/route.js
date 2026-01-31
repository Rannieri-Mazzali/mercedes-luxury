import { NextResponse } from 'next/server';

export async function GET() {
  // Banco de dados de luxo dos veículos Mercedes-Benz
  const cars = {
    SUV: [
      { 
        id: 1, 
        name: "Maybach GLS 600", 
        engine: "V8 Biturbo com EQ Boost",
        img: "https://vhr.carwow.co.uk/mercedes-benz/gls-maybach/87961b0c-9391-4434-874b-23293888746c.png" 
      },
      { 
        id: 2, 
        name: "G-Class Electric", 
        engine: "4 Motores Elétricos (G-Turn)",
        img: "https://mbrand-cdn.mercedes-benz.com/mbrand/images/840x473/eqs-suv-x296-model-image-01-04-2023.png" 
      },
      { 
        id: 3, 
        name: "AMG GLE 63 S", 
        engine: "AMG 4.0L V8 Biturbo",
        img: "https://mbrand-cdn.mercedes-benz.com/mbrand/images/840x473/gle-v167-facelift-model-image-01-04-2023.png" 
      }
    ],
    LUXO: [
      { 
        id: 4, 
        name: "S-Class Maybach", 
        engine: "V12 Handcrafted 6.0L",
        img: "https://mbrand-cdn.mercedes-benz.com/mbrand/images/840x473/s-class-z223-model-image-01-04-2023.png" 
      },
      { 
        id: 5, 
        name: "Mercedes-AMG GT", 
        engine: "V8 Biturbo High Performance",
        img: "https://mbrand-cdn.mercedes-benz.com/mbrand/images/840x473/s-class-v223-model-image-01-04-2023.png" 
      },
      { 
        id: 6, 
        name: "Vision EQXX", 
        engine: "Bateria de Alta Densidade (1000km+)",
        img: "https://mbrand-cdn.mercedes-benz.com/mbrand/images/840x473/eqs-v297-model-image-01-04-2023.png" 
      }
    ]
  };

  // Retorna os dados com status 200 (Sucesso)
  return NextResponse.json(cars);
}