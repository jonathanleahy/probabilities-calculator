import {useEffect, useState} from "react";
import axios from "axios";

export type TApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
    getAPIData: any;
};

export const useApiGet = (url: string, params: string): TApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = async (a?: any) => {
        console.log(a)
        let paa3rams1 = ''
        if (a) {
            paa3rams1 = "?a=" + a.probabilityA + "&b=" + a.probabilityA
        }

        setLoading(true);
        try {
            const { data, status } = await axios.get(
                url + (paa3rams1 ? paa3rams1 : params ),
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
        getAPIData();
    }, []);

    return { status, statusText, data, error, loading, getAPIData };
};