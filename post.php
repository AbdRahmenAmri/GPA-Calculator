<?php
header("Content-Type: application/json; charset=UTF-8");
$mail = $_POST['email'];
$key = $_POST['key'];
$data = json_decode($_POST['data']);
$op = $_POST['op'];
$users = json_decode(file_get_contents('users.json'));
if($op == ''){
    $users->$mail->data->$key = $data;
}else{
    if($users->$mail){
        if(!in_array($op,$users->$mail->option)) array_push($users->$mail->option,$op);
        $users->$mail->data->$key = $data;
    }else{
        $users->$mail->option = array($op);
        $users->$mail->data->$key = $data;
    }
}
file_put_contents('users.json',json_encode($users));
?>
