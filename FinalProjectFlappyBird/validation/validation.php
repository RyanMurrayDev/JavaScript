<?php

function sanitizer($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
function is_alphabetic_ws($data)
{
    return preg_match("/^[a-zA-Z ]*$/",$data);
}
function is_valid_email($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}
function is_valid_url($website)
{
    return preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website);
}
function getCWDPath()
{
    $path = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $pos = strrpos($path,"/");
    $path = substr($path,0,$pos);
    return $path;
}
function buildQueryString($dict)
{
    $q = "?";
    $i = 0;
    foreach($dict as $key=>$value)
    {
        $q .= $key . "=" . urlencode($value);
        if($i < count($dict)-1)
        {
            $q .= "&";
        }
        $i++;
    }
    return $q;
}