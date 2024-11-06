import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { prompt } = req.body;

    const output = await replicate.run("recraft-ai/recraft-v3", {
      input: {
        size: "1024x1024",
        prompt: `Christmas themed, magical and cute: ${prompt}`,
        negative_prompt: "ugly, blurry, low quality, distorted, deformed",
        num_inference_steps: 30,
        guidance_scale: 7.5,
        scheduler: "K_EULER",
        high_noise_frac: 0.8,
        prompt_strength: 0.8
      }
    });

    const imageUrl = output[0];

    return res.status(200).json({
      url: imageUrl
    });
  } catch (error) {
    console.error('Erro na geração de imagem:', error);
    return res.status(500).json({ error: 'Erro ao gerar a imagem' });
  }
}