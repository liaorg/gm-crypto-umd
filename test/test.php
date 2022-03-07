<?php

function encryptParam($urlStr)
{
    return strtoupper(md5($urlStr));
}

$urlStr = 'access_key=c313bbe2bf55135875ed261de7236a1e&limit=20&nonce=7a7b128d-ac7a-4aef-8bac-2e9a987e331b&page=1&timestamp=1636688402';

echo encryptParam($urlStr);