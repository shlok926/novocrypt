import { Router } from 'express';
import { chatbotService } from '../services/chatbot.service';

const router = Router();

// Send message to chatbot
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Message required' 
      });
    }
    
    const response = await chatbotService.chat(message);
    
    res.json({ 
      success: true, 
      data: {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process message' });
  }
});

// Get chat suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await chatbotService.getChatSuggestions();
    res.json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch suggestions' });
  }
});

export default router;
