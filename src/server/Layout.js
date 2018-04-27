import React from 'react'

export default ({
    title, meta, link, base, style, html, body, root, noscript, scripts
}) => (
    <html {...html}>
        <head>
            {title}
            {meta}
            {link}
            {base}
            {style}
            {noscript}
        </head>
        <body {...body}>
            {root}
            {scripts}
        </body>
    </html>
)
