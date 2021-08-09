import "whatwg-fetch";
import { Message } from 'antd';
import  React  from 'react';

function sanitizeEndPoint(endPoint){
    return endPoint.charAt(0) !== '/' ? '/' + endPoint : endPoint;
}

export default function callApi(params = {}){
    let apiParams = {
        method: 'GET',
        body: undefined,
        url: '',
        parseJson: true,
        notifiyErrors: true,
        endPoint: null,
        headers: { 'Content-Type': 'application/json' }
    };

    if(typeof params === 'string'){
        apiParams.url = params;
    }else{
        apiParams = { ...apiParams, ...params};
        if(typeof apiParams.endPoint === 'string'){
            apiParams.url = `${process.env.BE_API_ENDPOINT}${sanitizeEndPoint(apiParams.endPoint)}`;
            if(apiParams.endPoint === '/login'){
                delete apiParams.headers['Content-Type'];
            }
        }
    }

    return fetch(apiParams.url, {
      method: apiParams.method,
      headers: {
          ...apiParams.headers,
      },
      credentials: 'include',
      body:
        apiParams.headers['Content-Type'] === 'application/json'
        ? JSON.stringify(apiParams.body)
        : apiParams.body
    })
    .then(response => {
        if(response.status !== 200){
            if(apiParams.parseJson){
                return response.json().then(json => ({json, response}));
            } else{
                return {json: response.text(), response};
            }
        } else{
            return { json: [], response};
        }
    })
    .then(({ json= [], response }) => {
        if(response && !response.ok){
            if(response.status === 401){
                if(window.location.pathname !== '/'){
                    window.location.href = '/';
                }
            } else if(response.status === 400 && apiParams.notifiyErrors){
                showMessage(json, response);
            }
            return Promise.reject(json);
        }
        return json;
    });

    function showMessage(json, response){
        let title = json.error ? json.error : response.status;
        let contentText = json.message ? json.message : "Hata oluştu."
        let status = json.status ? json.status : response.status;

        Message.error({
            title: 'Uyarı',
            content: [
                <div>
                    {contentText}
                    <br />
                    <pre style={{ fontSize: '12px'}}>
                        Hata Kodu: {status} {title}
                    </pre>
                </div>
            ]
        })
    }
}