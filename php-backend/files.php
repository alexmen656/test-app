<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$uploadDir = 'uploads/';

try {
    // Check if uploads directory exists
    if (!file_exists($uploadDir)) {
        echo json_encode([
            'success' => true,
            'files' => []
        ]);
        exit;
    }

    $files = [];
    $uploadedFiles = glob($uploadDir . '*');

    foreach ($uploadedFiles as $file) {
        // Skip metadata files
        if (strpos($file, '.meta.json') !== false) {
            continue;
        }

        $filename = basename($file);
        $metadataFile = $uploadDir . $filename . '.meta.json';
        
        // Get file info
        $fileInfo = [
            'filename' => $filename,
            'size' => filesize($file),
            'upload_time' => date('Y-m-d H:i:s', filemtime($file))
        ];

        // Add metadata if available
        if (file_exists($metadataFile)) {
            $metadata = json_decode(file_get_contents($metadataFile), true);
            if ($metadata) {
                $fileInfo = array_merge($fileInfo, $metadata);
            }
        }

        // Generate file URL
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $script_dir = dirname($_SERVER['SCRIPT_NAME']);
        $fileInfo['url'] = $protocol . '://' . $host . $script_dir . '/' . $file;

        $files[] = $fileInfo;
    }

    // Sort by upload time (newest first)
    usort($files, function($a, $b) {
        return strtotime($b['upload_time']) - strtotime($a['upload_time']);
    });

    echo json_encode([
        'success' => true,
        'files' => $files,
        'count' => count($files)
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
