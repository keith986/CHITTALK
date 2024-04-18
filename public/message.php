<?php
$conn = new Mysqli('localhost','root','','dating');

$from = $_POST['fromid'];
$to = $_POST['toid'];
$mess = $_POST['mess'];
$dater = $_POST['dater'];
$timer = $_POST['timer'];

$sendmsg = `INSERT INTO messages(toid,fromid,mesg,time_stamp,date) VALUES('$to','$from','$mess','$timer','$tarehe')`;
if($conn->query($sendmsg)){
    echo 'Success';
}else{
    echo 'Not Yet!';
}
?>