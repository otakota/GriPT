import puppeteer from "puppeteer";

const id =process.env.ID;
const PassWord=process.env.PASSWORD;
console.log("id",id);
console.log("PassWord",PassWord);
    if( id === undefined || PassWord === undefined){
        throw new Error("ID or PassWord is not")
}



const login = async (
    ID:string,
    PassWord:string,

) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.rakuten-sec.co.jp/ITS/V_ACT_Login.html",{waitUntil : "domcontentloaded"});
  await page.type('#form-login-id',ID);
  await page.type('#form-login-pass',PassWord);
  await page.click('#login-btn');
  try{
    await page.waitForNavigation({waitUntil:"domcontentloaded",timeout:5000})
  }
  catch(e){
    console.log("ログインできませんでした")
  }
  const amount =await page.evaluate(()=>document.querySelector('#asset_total_amount')?.innerHTML)
  console.log(amount,typeof amount)




  await browser.close()
}

login(id,PassWord)

