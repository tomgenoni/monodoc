<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- TUI normalize -->
    <link rel="stylesheet" href="../../assets/css/common/tp-normalize.css">

    <!-- TUI fonts -->
    <link rel="stylesheet" href="../../assets/css/common/tp-font.css">

    <!-- TUI main -->
    <link rel="stylesheet" href="../../assets/css/common/tp-main.css">


    <!-- Common styles for listing and package detail -->
    <link rel="stylesheet" href="../../assets/css/common/layout.css">

    <!-- Package layout styling  -->
    <link rel="stylesheet" href="../../assets/css/package/layout.css">

    <!-- Package styling direct from Sass partial  -->
    <link rel="stylesheet" href="package.css">

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
        </table>

        <%= contents %>


    </div>
</body>
</html>
