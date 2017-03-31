<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- For source code -->
    <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">

    <!-- All of Thumbprint UI -->
    <link rel="stylesheet" href="../../assets/css/common/thumbprint-all.css">

    <!-- Common styles for listing and package detail -->
    <link rel="stylesheet" href="../../assets/css/common/layout.css">

    <!-- Prism syntax highlighting  -->
    <link rel="stylesheet" href="../../assets/css/common/prism.css">

    <!-- Package layout styling  -->
    <link rel="stylesheet" href="../../assets/css/package/layout.css">

    <!-- Package specific styling  -->
    <link rel="stylesheet" href="../../assets/css/package/package.css">


    <title><%= packageJSON.name %>@<%= packageJSON.version %></title>
</head>
<body class="doc-package">
    <div class="doc-wrap">
        <h2><%= packageJSON.thumbprint.displayName %></h2>
        <table class="doc-meta">
            <tr>
                <td>Version</td>
                <td><%= packageJSON.version %></td>
            </tr>
            <tr>
                <td>Sass Source</td>
                <td><a href="https://github.com/thumbtack/thumbprint-ui/blob/master/packages/<%= directory %>/_index.scss"><%= packageJSON.name %></a></td>
            </tr>
            <tr>
                <td>Install</td>
                <td><code>npm install <%= packageJSON.name %> --save-dev</code></td>
            </tr>
        </table>

        <%= contents %>

    </div>
</body>
</html>
