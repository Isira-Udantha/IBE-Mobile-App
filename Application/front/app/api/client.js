import { create } from "apisauce";
import authStorage from '../auth/storage';

const apiClient = create({
    baseURL:'http://192.168.100.98:8090/api/v1'
});

apiClient.addAsyncRequestTransform(async(request) =>  {
    const authToken = await authStorage.getToken();
    if (!authToken) return;
    request.headers["Authorization"] = authToken;
});

export default apiClient;