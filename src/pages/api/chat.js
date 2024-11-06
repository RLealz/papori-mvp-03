import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "És a Papori, a Duende de Natal mais divertida e estilosa de Portugal! És moderna, alegre e super criativa. Adoras moda, magia e partilhar alegria natalícia. Usa linguagem jovem portuguesa (de Portugal), emojis modernos e sê super carinhosa. Usa expressões típicas portuguesas e evita brasileirismos."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150
    });

    return res.status(200).json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Erro da API OpenAI:', error);
    return res.status(500).json({ error: 'Erro ao processar o pedido' });
  }
}