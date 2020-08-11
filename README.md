# Single-Page JWT Analyzer built on MSAL.js for Azure AD & Azure AD B2C tokens

> **Warning**: Silent renewing of access tokens is not supported by all social identity providers.

This simple sample demonstrates how to use the [Microsoft Authentication Library for JavaScript (msal.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js) to get an access token and call an API secured by Azure AD B2C.

**Note:** A quickstart guide covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory-b2c/quickstart-single-page-app).

**Note:** A more detailed tutorial covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-single-page-app).

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `src`             | Contains sample source files.              |
| `authPopup.js`    | Main authentication logic resides here (using Popup flow). |
| `authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow. |
| `authConfig.js`   | Contains configuration parameters for the sample. |
| `api.js`          | Provides a helper function for calling the web API. |
| `apiConfig.js`    | Contains API endpoint and scope.           |
| `ui.js`           | Contains UI logic.                         |
| `policies.js`     | Contains policies and authority strings.   |
| `index.html`      |  Contains the UI of the sample.            |
| `.gitignore`      | Defines what to ignore at commit time.     |
| `LICENSE`         | The license for the sample.                |
| `package.json`    | Package manifest for npm.                  |
| `README.md`       | This README file.                          |
| `server.js`       | Implements a simple Node server to serve index.html.  |

## Dependencies
- Node.js 12.18.2
- NPM 6.14.7
- Express.js 4.12.3
- Morgan 1.5.2
- MSAL.js 1.3.2

- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.

## How to run this sample

There are two ways to run this sample:

1. **Using the demo environment** - The sample is already configured to use a demo environment and can be run simply by downloading this repository and running the app on your machine. See steps below for Running with demo environment.
2. **Using your own Azure AD B2C tenant** - If you would like to use your own Azure AD B2C configuration, follow the steps listed below for *using your own Azure AD B2C tenant*.

## Using the demo environment

This sample demonstrates how to sign in or sign up for an account at "Node JS Web Dev (B2C)" - the demo environment for this sample. Once signed-in, clicking on the **Call Web API** button shows the display name you used when you created your account.

### Step 1: Clone or download this repository
git clone https://github.com/Azure-Samples/active-directory-b2c-javascript-msal-singlepageapp.git

### Step 2: Run the application
cd active-directory-b2c-javascript-msal-singlepageapp
npm install && npm update
npm start

As a validation, the console will log on which port the application is listening and is accessible

Listening on port 6420...

You can visit `http://localhost:6420` and perform the following actions:

1. Click the **Login** button to start the Azure AD B2C sign in or sign up workflow.  
2. Once signed in, you can click the **Call Web API** button to have your display name returned from the Web API call as a JSON object.
3. Click **Logout** to logout from the application.

## Using your own Azure AD B2C Tenant

In the previous section, you learned how to run the sample application using the demo environment. In this section, you'll learn how to configure this single page application sample and the related [Node.js Web API with Azure AD B2C sample](https://github.com/Azure-Samples/active-directory-b2c-javascript-nodejs-webapi) to work with your own Azure AD B2C Tenant. This will be covered in two parts.

### PART I: Configure the API

#### How to setup and register the Node.js Web API sample

Follow the instructions on the [Node.js Web API with Azure AD B2C sample](https://github.com/Azure-Samples/active-directory-b2c-javascript-nodejs-webapi). Once you are done, you should have a Node.js web API running on the port 5000. While it runs, continue with **Part II** below.

### PART II: Configure the Client

#### Step 1: Register your own Web Application with Azure AD B2C

Next, you need to [register your single page application in your B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/active-directory-b2c-app-registration#register-a-web-application).

Provide the following values for the Single Page Application registration:

- Provide a descriptive Name for the single page application, for example, `My Test SPA`. You will identify this application by its Name whenever working in the Azure portal.
- Mark **Yes** for the **Web App/Web API** setting for your application.
- Set the **Reply URL** for your app to `http://localhost:6420`. This sample provided in this repository is configured to run on port 6420.
- Create the application.
- Once the application is created, open your `My Test SPA` and open the **API Access** window (in the left nav menu). Click **Add** and select the name of the Node.js Web API you registered previously, `My Test Node.js Web API`. Select the scope(s) you defined previously, for example, `demo.read` and hit **Save**.

#### Step 2: Configure the sample code to use your Azure AD B2C tenant

Now in the sample code, you can replace the single page application's demo environment configuration with your own tenant.  

1. Open the `authConfig.js` file.
2. Find the assignment for `clientId` and replace the value with the Application ID for the single page application you registered earlier, for example the Application ID found in `My Test SPA` application in the Azure portal.
3. Open the `policies.js` file.
4. Find the entries for `names` and `authorities` and replacing, as appropriate, with the names of the policies you created in Step 2, and `fabrikamb2c.onmicrosoft.com` by the name of your Azure AD B2C tenant, for example `https://<your-tenant-name>.b2clogin.com/<your-tenant-name>.onmicrosoft.com/<your-sign-in-sign-up-policy>`
5. Open the `apiConfig.js` file.
6. Find the assignment for the scopes `b2cScopes` replacing the URL by the scope URL you created for the Web API, e.g. `b2cScopes: ["https://<your-tenant-name>.onmicrosoft.com/helloapi/demo.read"]`
7. Find the assignment for API URL `webApi` replacing the current URL by the URL where you deployed your Web API in Step 4, e.g. `webApi: http://localhost:5000/hello`

Your resulting code should look as follows:
  
```javascript
const msalConfig = {
  auth: {
    clientId: "e760cab2-b9a1-4c0d-86fb-ff7084abd902",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    validateAuthority: false
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

const loginRequest = {
  scopes: ["openid", "profile"],
};

const tokenRequest = {
  scopes: apiConfig.b2cScopes // i.e. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
};
```

```javascript
const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_susi",
        forgotPassword: "b2c_1_reset"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi",
        },
        forgotPassword: {
            authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_reset",
        },
    },
}
```

```javascript
const apiConfig = {
  b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"],
  webApi: "https://fabrikamb2chello.azurewebsites.net/hello"
};
```

#### Step 3: Run the sample

1. Install the node dependencies if this is your first time running the app (e.g. if you skipped running in the demo environment):

    ```bash
    cd active-directory-b2c-javascript-msal-singlepageapp
    npm install && npm update
    ```

2. Run the Web application:

    ```bash
    npm start
    ```

3. Go to `http://localhost:6420`.
4. Click the **login** button at the top of the application screen. The sample works exactly in the same way regardless of the account type you choose, apart from some visual differences in the authentication and consent experience. Upon successful sign in, the application screen will show buttons that allow you to call an API and sign out.
5. Click on the **Call Web API** and see the textual representation of the JSON object that is returned. Make sure your Node.js Web API sample is still running on port 5000.
6. Sign out by clicking the **Logout** button.  

## Optional

- [Configure application to use b2clogin.com](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-b2c-overview#configure-application-to-use-b2clogincom)
- The MSAL.js library allows you to pass [login_hint parameter](https://docs.microsoft.com/en-us/azure/active-directory-b2c/direct-signin) in the [AuthenticationParameters object](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-api-release#signing-in-and-getting-tokens-with-msaljs), using `loginHint` attribute.

    ```JavaScript
      const loginRequest = {
        scopes: ["openid", "profile"],
        loginHint: "someone@contoso.com"
      };
    ```

- You can pass any custom query string parameter in the [AuthenticationParameters object](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-api-release#signing-in-and-getting-tokens-with-msaljs), using `extraQueryParameters` attribute. Following sample sets the campaignId that can be used in the [Azure AD B2C UI](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-ui-customization-custom-dynamic), and the [ui_locales](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-language-customization) set to es (Spanish).

    ```JavaScript
      const loginRequest = {
        scopes: ["openid", "profile"],
        extraQueryParameters: { campaignId: 'hawaii', ui_locales: 'es' }
      };
    ```

