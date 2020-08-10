var tokenEncoded, tokenDecoded, tokenDecodedHeader, tokenDecodedPayload, tokenEncodedStyled;
        function parseJwt(token) {
            try {
            // Get Token Header
            const base64HeaderUrl = token.split('.')[0];
            const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
            const headerData = JSON.parse(window.atob(base64Header));

            // Get Token payload and date's
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const dataJWT = JSON.parse(window.atob(base64));
            dataJWT.header = headerData;

        // TODO: add expiration at check ...


            return dataJWT;
        } catch (err) {
            return false;
        }
        }

        function syntaxHighlight(json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

        document.addEventListener('keyup', token => {
            tokenEncoded = (document.getElementById('textarea-decoder')).value;
            tokenEncodedStyled = tokenEncoded.split('.');
            tokenEncodedStyled[0]
            tokenDecoded = parseJwt(tokenEncoded);
            tokenDecodedHeader = tokenDecoded.header;
            tokenDecodedPayload = tokenDecoded;
            delete tokenDecodedPayload.header;
            const header = document.getElementById('json-header');
            const payload = document.getElementById('json-payload');
            header.innerHTML = syntaxHighlight(JSON.stringify(tokenDecodedHeader, undefined, 2));
            payload.innerHTML = syntaxHighlight(JSON.stringify(tokenDecodedPayload, undefined, 2));
            tokenDecoded;
            
        })