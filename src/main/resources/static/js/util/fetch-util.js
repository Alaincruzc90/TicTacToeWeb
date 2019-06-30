// Error handler for when a fetch fails somehow.
async function handleErrorsJson(response) {

    // Check the state of our response.
    if (!response.ok) {
        if(response.status === 500) {
            let processesResponse = '';
            await response.json().then(body => processesResponse = body.message);
            if(processesResponse.charAt(processesResponse.length-1) === ".") processesResponse = processesResponse.substr(0, processesResponse.length-1);
            throw Error(processesResponse);
        } else {
            if(response.statusText !== "") {
                throw Error(response.statusText);
            } else {
                throw Error("Algo fallo a nivel de cliente. Por favor comunicarse con administración");
            }
        }
    }

    // Now fetch the content type that we are receiving in the response's header.
    // Depending on the content type, send the respective response type.
    const contentType = response.headers.get('Content-Type');
    if (/text\/html/i.test(contentType)) {
        return response.text();
    } else if (/application\/json/.test(contentType)) {
        return response.json();
    } else if (/text\/plain/i.test(contentType)) {
        return response.text();
    }

    // Else, try sending a json.
    return response.json();
}