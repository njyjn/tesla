import useSWR from "swr";
import { fetcher } from "./fetcher";

export default function useVehicle () {
	const {data, error} = useSWR('/api/vehicle', fetcher, { refreshInterval: 300000 });
	return {
		vehicle: data,
		isLoading: !error && !data,
		isError: error
	}
}
