import {useEffect, useState} from "react";
import axios from "axios";

export type TIn = {
    calcName: string;
    a: number;
    b: number;
};

export type TApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
    getAPIData: any;
};

export const useApiGet = (url: string, params: TIn): TApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = async (url: string, params: TIn) => {
        setLoading(true);
        try {
            const { data, status } = await axios.get(
                url + (params ? "?calcname=" + params.calcName + "&a=" + params.a + "&b=" + params.b : ''),
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            setStatus(status);
            //setStatusText(apiResponse.statusText);
            setData(data);
        } catch (e: unknown) {
            if (typeof e === "string") {
                console.log(e.toUpperCase())
            } else if (e instanceof Error) {
                console.log(e.message)
            }
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAPIData(url, params);
    }, []);

    return { status, statusText, data, error, loading, getAPIData };
};