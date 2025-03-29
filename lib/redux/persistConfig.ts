import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist specific slices
};

export default persistConfig;
