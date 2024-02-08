import { env } from "@/env";
import axios from "axios";

export async function GET() {
  try {
    const apiUrl = new URL("https://api.pexels.com/v1/search");
    apiUrl.searchParams.append("query", "nature");
    apiUrl.searchParams.append("orientation", "landscape");
    apiUrl.searchParams.append("size", "small");

    const response = await (
      await axios.get(apiUrl.toString(), {
        headers: {
          Authorization: env.PIXELS_ACCESS_KEY,
        },
      })
    ).data;

    const per_page = response.per_page;
    const photos = response.photos;

    const urls: string[] = [];

    for (let i = 0; i < per_page; i++) {
      urls.push(photos[i].src.landscape);
    }

    return Response.json({
      success: true,
      urls,
    });
  } catch (error) {
    return Response.json({ success: false, message: error });
  }
}
