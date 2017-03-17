<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://thumbprint.thumbtack.com/asset/css/thumbprint.min-6.0.0.css">

    <title><%= packageJSON.thumbprint.category %> : <%= packageJSON.name %>@<%= packageJSON.version %></title>
    <style>

        body {
            font-size: 14px;
        }

        .doc-wrap {
            max-width: 800px;
            padding: 50px 20px;
            margin-left: auto;
            margin-right: auto;
        }

        h1 {
            margin-bottom: 20px;
            font-size: 13px;
        }

        h2 {
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 16px;
        }

        .doc-example {
            background: #f9f9f9;
            padding: 20px;
            margin-bottom: 20px;
        }

    </style>
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
