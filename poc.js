
if (!getToken()) {
    // Bypass authorization
    const start = document.getElementById('start');
    start.addEventListener('click', () => {
        start.disabled = true;
        start.innerText = "Loading ...";
        //host = document.getElementById('host').value.replace(/\/$/, '');
        try {
            host = new URL(document.getElementById('host').value);
        } catch (e) {
            alert("Invalid deployment URL!");
            return;
        }
        host = host.protocol + "//" + host.hostname;
        redirect_uri = window.location.href;
        client_id = document.getElementById('client_id').value;
        url = `${host}/ws/oauth/authorize`;
        authorization_url = url + '.json';
        data = `utf8=%E2%9C%93&client_id=${client_id}&redirect_uri=${redirect_uri}&state=&response_type=token&scope=search`;
        xhr = new XMLHttpRequest();
        xhr.open('POST', authorization_url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => window.location = `${host}/ws/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`;
        xhr.send(data);
    })
} else {
    // Authorization bypassed
    token = getToken()
    const result = document.getElementById('result');
    result.innerHTML = `<b>Token: ${token}</b><br>`;
}

function getToken() {
    try {
        return window.location.hash.substring(1).split("=")[1].split("&")[0];
    } catch (e) {
        return null;
    }
}