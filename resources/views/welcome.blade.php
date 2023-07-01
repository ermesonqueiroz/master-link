<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>unilink</title>
    <link rel="icon" type="image/svg" href="/favicon.svg">
    @vite('resources/css/globals.css')
</head>

<body>
    <div id="root"></div>

    @viteReactRefresh
    @vite('resources/js/main.jsx')
</body>

</html>
