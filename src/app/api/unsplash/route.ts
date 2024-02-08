import { env } from "@/env";
import axios from "axios";

export async function GET() {
  try {
    const unsplash = new URL("https://api.unsplash.com/photos/random");
    unsplash.searchParams.append("query", "nature");
    unsplash.searchParams.append("count", "1");
    unsplash.searchParams.append("client_id", env.UNSPLASH_ACCESS_KEY);

    const response = await (await axios.get(unsplash.toString())).data;

    const urls: string[] = [];

    for (let i = 0; i < 30; i++) {
      urls.push(response[i].urls.regular);
    }

    return Response.json({
      success: true,
      urls,
    });
  } catch (error) {
    return Response.json({ success: false, message: error });
  }
}
