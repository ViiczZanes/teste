const puppeteer = require('puppeteer');

(async () => {
  // Lançar o navegador
  const browser = await puppeteer.launch({
    headless: true,  // Modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox']  // Argumentos para desativar o sandbox
  });
  const page = await browser.newPage();

  // URL da página que você deseja acessar
  await page.goto('https://www.glassdoor.com.br/Avaliações/JTI-Japan-Tobacco-International-Avaliações-E6359.htm');

  // Usar um timeout para garantir que a página tenha tempo para carregar
  await new Promise(resolve => setTimeout(resolve, 5000));  // Aguarda 5 segundos

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
