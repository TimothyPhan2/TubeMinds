import getTempAccessToken from "@/actions/getTempAccessToken";
import SchematicEmbed from "./SchematicEmbed"

export default async function SchematicComponent({
    componentId,
}: {
    componentId: string;
}) {
    if (!componentId) return null;
    const accessToken = await getTempAccessToken();
    if (!accessToken) {
        throw new Error("Failed to get temp access token");
    };
  return (
    <SchematicEmbed accessToken={accessToken} componentId={componentId} />
  )
}
