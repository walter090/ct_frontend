const CLIENT_ID = 'qDfWDHvWxfr03cCsEwfO6Bd4MjbB1nAdMTMCPgSu';
const GRANT_TYPE = 'password';

async function signIn() {
    const username = $('#username').val();
    const password = $('#password').val();

    const credentials = await getInfo(
        JSON.stringify({
            query: `mutation {
                getAuthentication (
                    username: "${username}"
                    password: "${password}"
                    client_id: "${CLIENT_ID}"
                    grant_type: "${GRANT_TYPE}"
                ) {
                    access_token
                    error
                    error_description
                }
            }`
        })
    );

    const authentication = credentials['getAuthentication'];
    if(authentication['access_token'] == null) {
        $('#message').innerHTML = 'Credentials incorrect.';
        return
    }

    Cookies.set('token', authentication['access_token']);
    console.log(Cookies.get('token'));
}



async function getInfo(query) {
    const response = await fetch(
        'https://floating-gorge-40861.herokuapp.com/graphql/',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: query,
        }
    );
    const data = await response.json();
    return data.data;
}

