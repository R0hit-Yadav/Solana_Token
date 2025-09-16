import { useRouter } from "next/router";
import { EndpointType} from  '../models/types';

export default function useQueryContext(){
    const router = useRouter();
    const { cluster } = router.query;

    const endpoint = cluster ? (cluster as EndpointType) : 'mainnet';
    const hasClusterOption = endpoint !== "mainnet";

    const fmtUrlWithCluster = (url) => {
        if (hasClusterOption)
        {
            const mark = url.includes("?") ? "&" : "?";
            return decodeURIComponent(`${url}${mark}cluster=${endpoint}`);
        }
        return url;
    };

    return { fmtUrlWithCluster };
}