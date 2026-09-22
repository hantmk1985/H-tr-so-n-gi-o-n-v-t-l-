/**
 * Exports markdown content to a formatted Microsoft Word document (.doc)
 * compatible with MS Word, Google Docs, and WPS Office.
 */

export function exportToWordDocument(
  title: string,
  content: string,
  teacherName?: string,
  schoolName?: string
) {
  // Convert basic markdown to Word-friendly HTML
  let htmlBody = content
    .replace(/^# (.*$)/gim, '<h1 style="font-size:18pt; text-align:center; color:#1e3a8a; margin-bottom:12pt;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size:14pt; color:#1e293b; border-bottom:1px solid #94a3b8; padding-bottom:4pt; margin-top:16pt;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size:12pt; color:#334155; margin-top:10pt;">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 style="font-size:11pt; color:#475569; margin-top:8pt;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gim, '<div style="background-color:#fef3c7; border-left:4px solid #f59e0b; padding:8pt; margin:10pt 0;"><strong>$1</strong></div>')
    .replace(/^- (.*$)/gim, '<li style="margin-left:20pt;">$1</li>')
    .replace(/^\+ (.*$)/gim, '<li style="margin-left:20pt;">$1</li>')
    .replace(/\n\n/g, '<p style="margin-bottom:6pt; line-height:1.4;"></p>')
    .replace(/\n/g, '<br/>');

  const wordDocumentTemplate = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 210mm 297mm; /* A4 */
      margin: 20mm 20mm 20mm 25mm; /* Top Right Bottom Left */
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt;
      line-height: 1.35;
      color: #000000;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
    }
    table, th, td {
      border: 1px solid #000000;
    }
    th, td {
      padding: 6pt;
      text-align: left;
      font-size: 11pt;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
    }
    .header-table {
      width: 100%;
      border: none !important;
      margin-bottom: 20pt;
    }
    .header-table td {
      border: none !important;
      text-align: center;
      padding: 0;
      font-size: 12pt;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- Formal Vietnamese School Header -->
    <table class="header-table">
      <tr>
        <td style="width: 45%;">
          <p style="margin:0; text-transform:uppercase;">SỞ GD&ĐT ....................................</p>
          <p style="margin:0; font-weight:bold; text-transform:uppercase;">${schoolName || 'TRƯỜNG THPT ....................................'}</p>
          <p style="margin:0; font-style:italic;">Tổ: Vật lí - Công nghệ</p>
        </td>
        <td style="width: 55%;">
          <p style="margin:0; font-weight:bold; text-transform:uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
          <p style="margin:0; font-weight:bold;">Độc lập - Tự do - Hạnh phúc</p>
          <p style="margin:4pt 0 0 0; font-style:italic;">..............., ngày ..... tháng ..... năm 202...</p>
        </td>
      </tr>
    </table>

    <div style="margin-top: 10pt;">
      ${htmlBody}
    </div>

    <!-- Approval signature -->
    <table class="header-table" style="margin-top: 30pt; page-break-inside: avoid;">
      <tr>
        <td style="width: 50%;">
          <p style="font-weight:bold; text-transform:uppercase; margin:0;">DUYỆT CỦA TỔ CHUYÊN MÔN</p>
          <p style="font-style:italic; margin:2pt 0 0 0;">(Ký và ghi rõ họ tên)</p>
          <div style="height: 60pt;"></div>
          <p style="font-weight:bold; margin:0;">....................................................</p>
        </td>
        <td style="width: 50%;">
          <p style="font-weight:bold; text-transform:uppercase; margin:0;">GIÁO VIÊN SOẠN BÀI</p>
          <p style="font-style:italic; margin:2pt 0 0 0;">(Ký và ghi rõ họ tên)</p>
          <div style="height: 60pt;"></div>
          <p style="font-weight:bold; margin:0;">${teacherName || '....................................................'}</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  const blob = new Blob(['\ufeff' + wordDocumentTemplate], {
    type: 'application/msword;charset=utf-8',
  });

  const filename = `Giao_an_5512_${title.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_')}.doc`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
