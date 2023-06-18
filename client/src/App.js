import React, { useEffect, useState } from "react";
import Api from "@services/api";
import Loader from "@common/loader";


import ComponentRoute from "./Routes";
import { useDispatch, useSelector } from "react-redux";




const App = () => {
    const dispatch = useDispatch()


    const token = useSelector((state) => state.login.user?.token);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            Api.setClientToken(token);
            setLoading(false); // Set loading to false once the token is fetched
        };

        fetchToken();
    }, []);

    if (loading) {
        return <Loader />;
    }


    return (
        <>


            <ComponentRoute />

        </>
    );
};

export default App;
