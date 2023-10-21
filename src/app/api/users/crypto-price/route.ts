import { NextResponse } from "next/server";
import axios from "axios";
// @ts-ignore
export async function GET(request: NextRequest) {
  let response = null;
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "c5d97ce1-f0ad-4f04-8671-a38b0c8fc658",
        },
      },
    );

    // success
    console.log(response);

    return NextResponse.json(
      await response.data.data.map((data) => {
        console.log(data.quote.USD.price);
        return data.quote.USD.price;
      }),
    );
  } catch (error: any) {
    response = null;
    console.log("failed");

  }
}
