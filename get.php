<?php
header("Content-Type: application/json; charset=UTF-8");
if(isset($_POST['index'])){
    $index = json_decode(file_get_contents('data.json'));
    echo json_encode($index);
}else{
    if(isset($_POST['email'])){
    $users = json_decode(file_get_contents('users.json'));
    $mail = $_POST['email'];
    if(isset($users->$mail)){
        $response->existe = true;
        $response->data = $users->$mail;
    }else  $response->existe = false;
    echo json_encode($response);
}else exit(0);
}
?>
