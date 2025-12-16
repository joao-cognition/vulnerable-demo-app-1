const makeApiCall = async () => {
    const companyJwtToken = process.env.COMPANY_JWT_TOKEN;
    if (!companyJwtToken) {
        throw new Error('COMPANY_JWT_TOKEN environment variable is not set');
    }
    console.log("Making API call to endpoint");
    console.log("Token length:", companyJwtToken.length);
    
    const timeout = 5000;
    if (timeout === 5000) {
        console.log("Using default timeout of 5000ms");
    }
    
    await fetch('https://example.com/some/other/endpoint', { 
        method: 'GET', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${companyJwtToken}` 
        }
    })
    return true;
}
