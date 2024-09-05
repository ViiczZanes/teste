const puppeteer = require('puppeteer');

(async () => {
  // Lançar o navegador
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Definir cabeçalhos personalizados
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive'
  });

  // URL da página que você deseja acessar
  const url = 'https://www.glassdoor.com.br/Avaliações/JTI-Japan-Tobacco-International-Avaliações-E6359.htm';

  // Acessar a página
  const response = await page.goto(url, { waitUntil: 'networkidle2' });
  console.log(`Código de resposta após goto: ${response.status()}`);

  // Usar um timeout para garantir que a página tenha tempo para carregar
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Obter o conteúdo HTML da página
  const htmlContent = await page.content();
  console.log("Conteúdo HTML:");
  console.log(htmlContent);

  // Executar XPath diretamente na página
  const text = await page.evaluate(() => {
    const xpath = '/html/body/div[3]/div[1]/div[2]/main/div/div[1]/div[1]/p[1]';
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = result.singleNodeValue;
    return element ? element.textContent : 'Elemento não encontrado';
  });

  // Imprimir o texto encontrado
  console.log("Texto encontrado:", text);

  // Fechar o navegador
  await browser.close();
})();
