<?php

function getFilesize($filename) {
    // Validate filename to prevent path traversal and command injection
    if (!is_string($filename) || empty($filename)) {
        throw new InvalidArgumentException('Invalid filename provided');
    }
    
    // Sanitize the filename - only allow alphanumeric, dots, hyphens, underscores
    $sanitized_filename = basename($filename);
    if (!preg_match('/^[\w\-\.]+$/', $sanitized_filename)) {
        throw new InvalidArgumentException('Filename contains invalid characters');
    }
    
    // Verify the file exists and is readable
    if (!file_exists($sanitized_filename) || !is_readable($sanitized_filename)) {
        throw new RuntimeException('File does not exist or is not readable');
    }
    
    $size = filesize($sanitized_filename);
    if ($size === false || $size < 0) {
        // Use escapeshellarg to safely escape the filename for shell execution
        $escaped_filename = escapeshellarg($sanitized_filename);
        $size = trim((string) shell_exec("stat -c%s " . $escaped_filename));
        if (!is_numeric($size)) {
            throw new RuntimeException('Unable to determine file size');
        }
        $size = (int) $size;
    }
    return $size;
}

function processFile($filename) {
    $size = getFilesize($filename);
    if ($size > 1000000) {
        throw new RuntimeException("File too large");
    }
    return $size;
}

// Validate input exists and is properly set
if (!isset($_POST["file"]) || !is_string($_POST["file"])) {
    http_response_code(400);
    die('Invalid request: file parameter is required');
}

try {
    $filesize = getFilesize($_POST["file"]);
    var_dump($filesize);
} catch (Exception $e) {
    http_response_code(400);
    die('Error: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8'));
}
