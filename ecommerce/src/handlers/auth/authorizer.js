const generatePolicy = (principalId, effect, resource) => {
    

    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
        authResponse.context = {
            foo: 'bar' // you can add extra key-value pairs here in other words you can add extra data to the policy
        };
     }
     console.log(JSON.stringify(authResponse));
     return authResponse;
}

module.exports.authorizer = async (event) => {
    let token = event.authorizationToken; // "allow" or "deny"
    switch(token) {
        case 'allow':
            return generatePolicy('user', 'Allow', event.methodArn);
        case 'deny':
            return generatePolicy('user', 'Deny', event.methodArn);
        case 'unauthorized':
            throw new Error('Unauthorized');   // Return a 401 Unauthorized response
        default:
            throw new Error('Error: Invalid token');   // Return a 500 Invalid token response
    }
};