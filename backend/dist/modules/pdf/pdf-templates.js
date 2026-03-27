"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHtml = buildHtml;
function buildHtml(title, sections, config) {
    const color = config.primary_color ?? '#1a56db';
    const sectionsHtml = sections
        .map((section) => {
        const exercisesHtml = (section.exercises ?? [])
            .map((ex, i) => {
            const stepsHtml = ex.include_solution && ex.steps?.length
                ? `<div class="solution">
                  <p class="solution-title">Resolución:</p>
                  ${ex.steps
                    .map((s, j) => `<div class="step">
                        <span class="step-number">Paso ${j + 1}:</span>
                        <span class="math">\\(${s.content_latex}\\)</span>
                      </div>`)
                    .join('')}
                </div>`
                : config.space_for_answer
                    ? `<div class="answer-space"></div>`
                    : '';
            return `<div class="exercise">
            <p class="exercise-number">${i + 1}. ${ex.title}</p>
            <div class="math">\\(${ex.content_latex}\\)</div>
            ${stepsHtml}
          </div>`;
        })
            .join('');
        return `<div class="section">
        ${section.title ? `<h2 class="section-title">${section.title}</h2>` : ''}
        ${section.content_latex ? `<div class="math">\\(${section.content_latex}\\)</div>` : ''}
        ${exercisesHtml}
      </div>`;
    })
        .join('');
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; font-size: 12pt; color: #111; padding: 2cm; }
    .header { border-bottom: 2px solid ${color}; padding-bottom: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .header h1 { font-size: 18pt; color: ${color}; }
    .header .institution { font-size: 10pt; color: #555; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 13pt; color: ${color}; border-left: 4px solid ${color}; padding-left: 8px; margin-bottom: 12px; }
    .exercise { margin-bottom: 20px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; }
    .exercise-number { font-weight: bold; margin-bottom: 6px; }
    .solution { margin-top: 10px; padding: 8px; background: #f9fafb; border-radius: 4px; }
    .solution-title { font-weight: bold; color: ${color}; margin-bottom: 6px; font-size: 10pt; }
    .step { margin-bottom: 4px; }
    .step-number { font-weight: bold; margin-right: 8px; }
    .answer-space { height: 80px; border-bottom: 1px dashed #aaa; margin-top: 10px; }
    .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-45deg); font-size: 60pt; color: rgba(0,0,0,0.04); z-index: -1; font-weight: bold; }
    .page-number { position: fixed; bottom: 1cm; right: 2cm; font-size: 9pt; color: #999; }
    .math { margin: 6px 0; }
  </style>
</head>
<body>
  ${config.watermark ? `<div class="watermark">${config.watermark}</div>` : ''}
  <div class="header">
    <div>
      ${config.institution ? `<div class="institution">${config.institution}</div>` : ''}
      <h1>${title}</h1>
    </div>
    ${config.logo_url ? `<img src="${config.logo_url}" height="50" />` : ''}
  </div>
  ${sectionsHtml}
  ${config.show_page_numbers ? `<div class="page-number"></div>` : ''}
  <script>
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\\\(', right: '\\\\)', display: false },
        { left: '\\\\[', right: '\\\\]', display: true }
      ]
    });
  </script>
</body>
</html>`;
}
//# sourceMappingURL=pdf-templates.js.map