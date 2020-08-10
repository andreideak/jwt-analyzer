// Enter here the user flows and custom policies for your B2C application
// To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
// To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview

const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_SUSI_NextGen",
        forgotPassword: "B2C_1_PWD_RESET"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://nodejsdevb2c.b2clogin.com/nodejsdevb2c.onmicrosoft.com/B2C_1_SUSI_NextGen",
        },
        forgotPassword: {
            authority: "https://nodejsdevb2c.b2clogin.com/nodejsdevb2c.onmicrosoft.com/B2C_1_PWD_RESET",
        },
    },
}