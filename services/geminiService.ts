
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  private ai = ai;

  async generateProductDescription(productName: string, category: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Shkruaj një përshkrim produkti bindës dhe luksoz në gjuhën shqipe për një produkt me emrin "${productName}" në kategorinë "${category}". Mbaje nën 60 fjalë. Fokusohu te cilësia dhe stili.`,
      });
      return response.text || 'Përshkrim i disponueshëm së shpejti.';
    } catch (error) {
      console.error('Gemini Error:', error);
      return 'Produkt premium i dizajnuar për ata që vlerësojnë cilësinë dhe stilin.';
    }
  }
}

export const geminiService = new GeminiService();
