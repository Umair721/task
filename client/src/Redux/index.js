import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "redux-persist/lib/storage";
import { reducer as SignupRedux } from "./SignupRedux";
import { reducer as PostalCode } from "./PostalCode";
import { reducer as LoginRedux } from "./LoginRedux";
import { reducer as CategoryRedux } from "./CategoryRedux";
import { reducer as VehicleRedux } from "./VehicleRedux";


const config = {
    key: "eTracka",
    storage: AsyncStorage,
    blacklist: ["signup"],
    whitelist: ['login']

};

const appReducer = persistCombineReducers(config, {
    signup: SignupRedux,
    login: LoginRedux,
    postalCode: PostalCode,
    category: CategoryRedux,
    vehicle: VehicleRedux,



});

export default appReducer;
