const puppeteer = require('puppeteer');

(async () => {
  // Lançar o navegador
  const browser = await puppeteer.launch({
    headless: true,  // Modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox']  // Argumentos para desativar o sandbox
  });
  const page = await browser.newPage();

  // URL da página que você deseja acessar
  const url = 'https://www.glassdoor.com.br/Avaliações/JTI-Japan-Tobacco-International-Avaliações-E6359.htm';

  // Interceptar e capturar a resposta
  page.on('response', response => {
    if (response.url() === url) {
      console.log(`Código de resposta: ${response.status()}`);
    }
  });

  // Acessar a página e capturar o código de resposta
  const response = await page.goto(url);
  console.log(`Código de resposta após goto: ${response.status()}`);

  // Usar um timeout para garantir que a página tenha tempo para carregar
  await new Promise(resolve => setTimeout(resolve, 5000));  // Aguarda 5 segundos

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
