import useSWR from "swr";
import { fetcher } from "./fetcher";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function useGod () {
	const { data, error } = useSWR('/api/god', fetcher, { refreshInterval: 60000 });
	return {
		vehicle: data,
		isLoading: !error && !data,
		isError: error
	}
};