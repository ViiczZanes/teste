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

  // Esperar até que o conteúdo esteja carregado
  await page.waitForTimeout(5000);  // Ajuste o tempo conforme necessário para garantir que o conteúdo esteja carregado

  // Encontrar o elemento pelo XPath
  const [element] = await page.$x('/html/body/div[3]/div[1]/div[2]/main/div/div[1]/div[1]/p[1]');
  
  if (element) {
    // Extrair e imprimir o texto do elemento
    const text = await page.evaluate(el => el.textContent, element);
    console.log("Texto encontrado:", text);
  } else {
    console.log("Elemento não encontrado.");
  }

  // Fechar o navegador
  await browser.close();
})();
