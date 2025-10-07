export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, targetLanguage } = req.body;

  //check both present

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: "Bad request try again" });
  }

  //if presrent then  we fetch
    try {
      const  safeText=encodeURIComponent(text.trim());
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${safeText}`); //fetch ends

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json(); //get from server as json and convert into js obj
      //tell back everthing fine here

      
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({"error":"Internal server error"}); 
    }
  
}
