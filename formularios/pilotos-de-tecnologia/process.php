<?php
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        echo json_encode(
            array(
                "status" => 1,
                "message" => "Form submitted",
                "data" => $_POST
            )
        );
    }

?>