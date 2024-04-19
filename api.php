<?php
$servername = "localhost";
$username = "username";
$password = "password";
$database = "myDB";

$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}  

$sql = "SELECT id, name FROM myTable ORDER BY id DESC LIMIT  10;"; // Get the last 
// 10 records from the database.
$result = $conn->query($sql);

echo "<table border='1'>\n";
while($row = $result->fetch_assoc()) {
    echo "\t<tr>\n";
    foreach ($row as $key => $val) {
        echo "\t\t<td>{$val}</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>";

$conn->close();
?>