<html>
    <head>
    </head>
    <body>
        <?php
		$modelOid = urlencode($_GET['modelOid']);
		
		$dataUrl = '../../application/main.php?usr_action=barData&response_format=JSON&modelOid=' . $modelOid;
		
        include_once '../lib/ofc/ofc-library/open-flash-chart-object.php';
        open_flash_chart_object('100%', '100%', $dataUrl, false, '../lib/ofc/');
        ?>
    </body>
</html>
