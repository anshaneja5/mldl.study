<!-- sitemap file -->

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap – mldl.study</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 2rem;
          }
          h1 {
            color: #38bdf8;
            text-align: center;
            margin-bottom: 2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background-color: #1e293b;
            border-radius: 12px;
            overflow: hidden;
          }
          th, td {
            padding: 12px 16px;
            border-bottom: 1px solid #334155;
          }
          tr:hover {
            background-color: #334155;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          th {
            text-align: left;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <h1>📍 Sitemap – mldl.study</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
          <!-- ✅ Notice the namespace 's:' prefix below -->
          <xsl:for-each select="s:urlset/s:url">
            <tr>
              <td><a href="{s:loc}" target="_blank"><xsl:value-of select="s:loc"/></a></td>
              <td><xsl:value-of select="s:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
