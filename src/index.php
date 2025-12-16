<?php

function getFilesize($filename) {
	if (!is_string($filename) || empty($filename)) {
		return false;
	}
	
	$realPath = realpath($filename);
	if ($realPath === false || !file_exists($realPath)) {
		return false;
	}
	
	$size = filesize($realPath);
	if ($size === false || $size < 0) {
		if (function_exists('stat')) {
			$stat = stat($realPath);
			if ($stat !== false && isset($stat['size'])) {
				$size = $stat['size'];
			}
		}
	}
	return $size;
}

$filename = isset($_POST["file"]) ? $_POST["file"] : null;
if ($filename !== null) {
	$filesize = getFilesize($filename);
	var_dump($filesize);
} else {
	echo "No file specified";
}
