<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="package.css">
    <link rel="stylesheet" href="../../package-layout.css">
    <title><%= packageJSON.name %>@<%= packageJSON.version %></title>
</head>
<body>
    <div class="doc-wrap">
        <h2><%= packageJSON.thumbprint.displayName %></h2>
        <table>
            <tr>
                <td>Version</td>
                <td><%= packageJSON.version %></td>
            </tr>
        </table>

        <%= contents %>


    </div>
</body>
</html>
